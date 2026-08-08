import { createHash } from "node:crypto";
import {
  lstat,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

export const packageSchemaVersion = 1;
export const pluginName = "dualcorelink-multilingual-import-cli";
export const pluginVersion = "1.3.1";
export const translationSchemaVersion = 1;
export const packageFilename = `${pluginName}.zip`;
export const manifestFilename = `${pluginName}.manifest.json`;
export const fixedDosTime = 0;
export const fixedDosDate = 33;
export const fixedFileMode = 0o100644;
export const fixedCompressionMethod = 0;
export const fixedCompressionLevel = 0;
export const fixedCreateSystem = 3;

export const approvedRuntimeFiles = [
  "dualcorelink-multilingual-import-cli.php",
  "includes/class-cli-command.php",
  "includes/class-config.php",
  "includes/class-import-service.php",
  "includes/class-renderer.php",
  "includes/class-run-store.php",
  "includes/class-wordpress-repository.php",
  "includes/interface-repository.php",
  "schema/payload.schema.json",
] as const;

export type NormalizedFile = {
  relativePath: string;
  archivePath: string;
  bytes: Buffer;
  sha256: string;
  mode: "0644";
};

export type PackageManifestFile = {
  relativePath: string;
  normalizedByteSize: number;
  sha256: string;
  mode: "0644";
};

export type PackageManifestBase = {
  packageSchemaVersion: number;
  pluginVersion: string;
  translationSchemaVersion: number;
  packageFilename: string;
  files: PackageManifestFile[];
};

export type PackageManifest = PackageManifestBase & {
  manifestSha256: string;
};

export type PackageApproval = {
  packageSchemaVersion: number;
  packageFilename: string;
  zipSha256: string;
  manifestSha256: string;
  approvedBy: string;
  approvedDate: string;
  sourceCommit: string | null;
};

export type ParsedZipEntry = {
  path: string;
  bytes: Buffer;
  crc32: number;
  compressedSize: number;
  normalizedByteSize: number;
  compressionMethod: number;
  dosTime: number;
  dosDate: number;
  mode: number;
  createSystem: number;
  localExtraLength: number;
  centralExtraLength: number;
  commentLength: number;
};

export type ParsedZip = {
  entries: ParsedZipEntry[];
  archiveCommentLength: number;
};

const textDecoder = new TextDecoder("utf-8", { fatal: true });

function digest(bytes: Buffer | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) =>
          Buffer.from(left, "utf8").compare(Buffer.from(right, "utf8")),
        )
        .map(([key, child]) => [key, canonicalize(child)]),
    );
  }
  return value;
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

export function normalizeRelativePath(input: string): string {
  const normalized = input.replaceAll("\\", "/");
  if (
    normalized.length === 0 ||
    normalized.startsWith("/") ||
    /^[A-Za-z]:\//.test(normalized) ||
    normalized.includes("\0")
  ) {
    throw new Error(`unsafe package path: ${input}`);
  }
  const segments = normalized.split("/");
  if (
    segments.some(
      (segment) => segment === "" || segment === "." || segment === "..",
    )
  ) {
    throw new Error(`unsafe package path: ${input}`);
  }
  return segments.join("/");
}

export function normalizeTextBytes(input: Buffer): Buffer {
  let text = textDecoder.decode(input);
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  text = text.replace(/\r\n?/g, "\n");
  text = `${text.replace(/\n*$/g, "")}\n`;
  return Buffer.from(text, "utf8");
}

async function inventory(
  root: string,
  prefix = "",
): Promise<Array<{ relativePath: string; symbolicLink: boolean; file: boolean }>> {
  const output: Array<{
    relativePath: string;
    symbolicLink: boolean;
    file: boolean;
  }> = [];
  const names = await readdir(path.join(root, prefix));
  for (const name of names) {
    const relativePath = prefix ? path.join(prefix, name) : name;
    const absolutePath = path.join(root, relativePath);
    const details = await lstat(absolutePath);
    if (details.isSymbolicLink()) {
      output.push({ relativePath, symbolicLink: true, file: false });
      continue;
    }
    if (details.isDirectory()) {
      output.push(...(await inventory(root, relativePath)));
      continue;
    }
    output.push({
      relativePath,
      symbolicLink: false,
      file: details.isFile(),
    });
  }
  return output;
}

function byteSort(values: string[]): string[] {
  return [...values].sort((left, right) =>
    Buffer.from(left, "utf8").compare(Buffer.from(right, "utf8")),
  );
}

export async function collectNormalizedFiles(
  sourceRoot: string,
): Promise<NormalizedFile[]> {
  const found = await inventory(sourceRoot);
  const symbolicLink = found.find((entry) => entry.symbolicLink);
  if (symbolicLink) {
    throw new Error(`symbolic links are forbidden: ${symbolicLink.relativePath}`);
  }
  const unsupported = found.find((entry) => !entry.file);
  if (unsupported) {
    throw new Error(`unsupported package input: ${unsupported.relativePath}`);
  }
  const actual = byteSort(
    found.map((entry) => normalizeRelativePath(entry.relativePath)),
  );
  const expected = byteSort([...approvedRuntimeFiles]);
  const unexpected = actual.filter((entry) => !expected.includes(entry));
  const missing = expected.filter((entry) => !actual.includes(entry));
  if (unexpected.length > 0 || missing.length > 0) {
    throw new Error(
      `package whitelist mismatch; unexpected=${unexpected.join(",")}; missing=${missing.join(",")}`,
    );
  }

  const files: NormalizedFile[] = [];
  for (const relativePath of expected) {
    const raw = await readFile(
      path.join(sourceRoot, ...relativePath.split("/")),
    );
    const bytes = normalizeTextBytes(raw);
    files.push({
      relativePath,
      archivePath: normalizeRelativePath(`${pluginName}/${relativePath}`),
      bytes,
      sha256: digest(bytes),
      mode: "0644",
    });
  }
  return files;
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) !== 0 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function crc32(bytes: Buffer): number {
  let value = 0xffffffff;
  for (const byte of bytes) {
    value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  }
  return (value ^ 0xffffffff) >>> 0;
}

function localHeader(
  name: Buffer,
  bytes: Buffer,
  compressed: Buffer,
): Buffer {
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x0800, 6);
  header.writeUInt16LE(fixedCompressionMethod, 8);
  header.writeUInt16LE(fixedDosTime, 10);
  header.writeUInt16LE(fixedDosDate, 12);
  header.writeUInt32LE(crc32(bytes), 14);
  header.writeUInt32LE(compressed.length, 18);
  header.writeUInt32LE(bytes.length, 22);
  header.writeUInt16LE(name.length, 26);
  header.writeUInt16LE(0, 28);
  return header;
}

function centralHeader(
  name: Buffer,
  bytes: Buffer,
  compressed: Buffer,
  offset: number,
): Buffer {
  const header = Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE((fixedCreateSystem << 8) | 20, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0x0800, 8);
  header.writeUInt16LE(fixedCompressionMethod, 10);
  header.writeUInt16LE(fixedDosTime, 12);
  header.writeUInt16LE(fixedDosDate, 14);
  header.writeUInt32LE(crc32(bytes), 16);
  header.writeUInt32LE(compressed.length, 20);
  header.writeUInt32LE(bytes.length, 24);
  header.writeUInt16LE(name.length, 28);
  header.writeUInt16LE(0, 30);
  header.writeUInt16LE(0, 32);
  header.writeUInt16LE(0, 34);
  header.writeUInt16LE(0, 36);
  header.writeUInt32LE((fixedFileMode << 16) >>> 0, 38);
  header.writeUInt32LE(offset, 42);
  return header;
}

export function createDeterministicZip(files: NormalizedFile[]): Buffer {
  const ordered = [...files].sort((left, right) =>
    Buffer.from(left.archivePath, "utf8").compare(
      Buffer.from(right.archivePath, "utf8"),
    ),
  );
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let localOffset = 0;
  for (const file of ordered) {
    const safePath = normalizeRelativePath(file.archivePath);
    const name = Buffer.from(safePath, "utf8");
    const compressed = file.bytes;
    const local = localHeader(name, file.bytes, compressed);
    localParts.push(local, name, compressed);
    const central = centralHeader(
      name,
      file.bytes,
      compressed,
      localOffset,
    );
    centralParts.push(central, name);
    localOffset += local.length + name.length + compressed.length;
  }
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(ordered.length, 8);
  end.writeUInt16LE(ordered.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(localOffset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

function findEndOfCentralDirectory(archive: Buffer): number {
  const minimumOffset = Math.max(0, archive.length - 65_557);
  for (let offset = archive.length - 22; offset >= minimumOffset; offset -= 1) {
    if (archive.readUInt32LE(offset) === 0x06054b50) return offset;
  }
  throw new Error("ZIP end-of-central-directory record is missing");
}

function checkedSlice(
  archive: Buffer,
  start: number,
  length: number,
  label: string,
): Buffer {
  if (start < 0 || length < 0 || start + length > archive.length) {
    throw new Error(`invalid ZIP ${label} bounds`);
  }
  return archive.subarray(start, start + length);
}

export function parseAndVerifyZip(archive: Buffer): ParsedZip {
  const endOffset = findEndOfCentralDirectory(archive);
  const archiveCommentLength = archive.readUInt16LE(endOffset + 20);
  if (archiveCommentLength !== 0) {
    throw new Error("ZIP archive comment must be empty");
  }
  if (endOffset + 22 !== archive.length) {
    throw new Error("unexpected bytes after ZIP end record");
  }
  const disk = archive.readUInt16LE(endOffset + 4);
  const centralDisk = archive.readUInt16LE(endOffset + 6);
  const diskEntries = archive.readUInt16LE(endOffset + 8);
  const totalEntries = archive.readUInt16LE(endOffset + 10);
  const centralSize = archive.readUInt32LE(endOffset + 12);
  const centralOffset = archive.readUInt32LE(endOffset + 16);
  if (
    disk !== 0 ||
    centralDisk !== 0 ||
    diskEntries !== totalEntries ||
    totalEntries !== approvedRuntimeFiles.length
  ) {
    throw new Error("ZIP entry count or disk layout is invalid");
  }
  if (centralOffset + centralSize !== endOffset) {
    throw new Error("ZIP central directory bounds are invalid");
  }

  const entries: ParsedZipEntry[] = [];
  let offset = centralOffset;
  for (let index = 0; index < totalEntries; index += 1) {
    if (archive.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error("ZIP central entry signature is invalid");
    }
    const versionMadeBy = archive.readUInt16LE(offset + 4);
    const versionNeeded = archive.readUInt16LE(offset + 6);
    const flags = archive.readUInt16LE(offset + 8);
    const compressionMethod = archive.readUInt16LE(offset + 10);
    const dosTime = archive.readUInt16LE(offset + 12);
    const dosDate = archive.readUInt16LE(offset + 14);
    const expectedCrc = archive.readUInt32LE(offset + 16);
    const compressedSize = archive.readUInt32LE(offset + 20);
    const normalizedByteSize = archive.readUInt32LE(offset + 24);
    const nameLength = archive.readUInt16LE(offset + 28);
    const centralExtraLength = archive.readUInt16LE(offset + 30);
    const commentLength = archive.readUInt16LE(offset + 32);
    const diskStart = archive.readUInt16LE(offset + 34);
    const externalAttributes = archive.readUInt32LE(offset + 38);
    const localOffset = archive.readUInt32LE(offset + 42);
    if (centralExtraLength !== 0) {
      throw new Error("ZIP extra fields are forbidden");
    }
    if (commentLength !== 0) {
      throw new Error("ZIP entry comments are forbidden");
    }
    const name = checkedSlice(
      archive,
      offset + 46,
      nameLength,
      "central name",
    ).toString("utf8");
    const safePath = normalizeRelativePath(name);
    if (
      versionMadeBy !== ((fixedCreateSystem << 8) | 20) ||
      versionNeeded !== 20 ||
      flags !== 0x0800 ||
      diskStart !== 0
    ) {
      throw new Error("ZIP platform, version, flags, or disk metadata is invalid");
    }
    if (compressionMethod !== fixedCompressionMethod) {
      throw new Error("ZIP compression method is invalid");
    }
    if (dosTime !== fixedDosTime || dosDate !== fixedDosDate) {
      throw new Error("ZIP entry timestamp is not fixed");
    }
    const mode = (externalAttributes >>> 16) & 0xffff;
    if (mode !== fixedFileMode) {
      throw new Error("ZIP entry mode is not fixed");
    }
    if (archive.readUInt32LE(localOffset) !== 0x04034b50) {
      throw new Error("ZIP local entry signature is invalid");
    }
    const localFlags = archive.readUInt16LE(localOffset + 6);
    const localCompression = archive.readUInt16LE(localOffset + 8);
    const localTime = archive.readUInt16LE(localOffset + 10);
    const localDate = archive.readUInt16LE(localOffset + 12);
    const localCrc = archive.readUInt32LE(localOffset + 14);
    const localCompressedSize = archive.readUInt32LE(localOffset + 18);
    const localSize = archive.readUInt32LE(localOffset + 22);
    const localNameLength = archive.readUInt16LE(localOffset + 26);
    const localExtraLength = archive.readUInt16LE(localOffset + 28);
    if (localExtraLength !== 0) {
      throw new Error("ZIP local extra fields are forbidden");
    }
    const localName = checkedSlice(
      archive,
      localOffset + 30,
      localNameLength,
      "local name",
    ).toString("utf8");
    if (
      localName !== safePath ||
      localFlags !== flags ||
      localCompression !== compressionMethod ||
      localTime !== dosTime ||
      localDate !== dosDate ||
      localCrc !== expectedCrc ||
      localCompressedSize !== compressedSize ||
      localSize !== normalizedByteSize
    ) {
      throw new Error("ZIP local and central metadata do not match");
    }
    const compressed = checkedSlice(
      archive,
      localOffset + 30 + localNameLength,
      compressedSize,
      "compressed data",
    );
    const bytes = Buffer.from(compressed);
    if (
      bytes.length !== normalizedByteSize ||
      crc32(bytes) !== expectedCrc
    ) {
      throw new Error("ZIP entry content integrity failed");
    }
    entries.push({
      path: safePath,
      bytes,
      crc32: expectedCrc,
      compressedSize,
      normalizedByteSize,
      compressionMethod,
      dosTime,
      dosDate,
      mode,
      createSystem: versionMadeBy >>> 8,
      localExtraLength,
      centralExtraLength,
      commentLength,
    });
    offset += 46 + nameLength;
  }
  if (offset !== centralOffset + centralSize) {
    throw new Error("ZIP central directory contains unparsed bytes");
  }
  const sortedPaths = byteSort(entries.map((entry) => entry.path));
  if (
    JSON.stringify(entries.map((entry) => entry.path)) !==
    JSON.stringify(sortedPaths)
  ) {
    throw new Error("ZIP entries are not byte-sorted");
  }
  return { entries, archiveCommentLength };
}

export function createManifest(files: NormalizedFile[]): PackageManifest {
  const base: PackageManifestBase = {
    packageSchemaVersion,
    pluginVersion,
    translationSchemaVersion,
    packageFilename,
    files: files.map((file) => ({
      relativePath: file.relativePath,
      normalizedByteSize: file.bytes.length,
      sha256: file.sha256,
      mode: file.mode,
    })),
  };
  return {
    ...base,
    manifestSha256: digest(canonicalJson(base)),
  };
}

export function verifyManifest(manifest: PackageManifest): void {
  const { manifestSha256, ...base } = manifest;
  if (
    base.packageSchemaVersion !== packageSchemaVersion ||
    base.pluginVersion !== pluginVersion ||
    base.translationSchemaVersion !== translationSchemaVersion ||
    base.packageFilename !== packageFilename
  ) {
    throw new Error("candidate manifest package identity is invalid");
  }
  if (digest(canonicalJson(base)) !== manifestSha256) {
    throw new Error("candidate manifest SHA-256 mismatch");
  }
  if (manifest.files.length !== approvedRuntimeFiles.length) {
    throw new Error("candidate manifest file count is invalid");
  }
  const actual = manifest.files.map((file) =>
    normalizeRelativePath(file.relativePath),
  );
  if (JSON.stringify(actual) !== JSON.stringify(byteSort(actual))) {
    throw new Error("candidate manifest files are not byte-sorted");
  }
  if (
    JSON.stringify(actual) !==
    JSON.stringify(byteSort([...approvedRuntimeFiles]))
  ) {
    throw new Error("candidate manifest whitelist mismatch");
  }
  if (
    manifest.files.some(
      (file) =>
        file.mode !== "0644" ||
        !/^[a-f0-9]{64}$/.test(file.sha256) ||
        !Number.isSafeInteger(file.normalizedByteSize) ||
        file.normalizedByteSize <= 0,
    )
  ) {
    throw new Error("candidate manifest file metadata is invalid");
  }
}

export async function writeCandidatePackage(options: {
  sourceRoot: string;
  archivePath: string;
  manifestPath: string;
}): Promise<{
  zipSha256: string;
  manifestSha256: string;
  files: NormalizedFile[];
  manifest: PackageManifest;
}> {
  const files = await collectNormalizedFiles(options.sourceRoot);
  const archive = createDeterministicZip(files);
  const manifest = createManifest(files);
  await mkdir(path.dirname(options.archivePath), { recursive: true });
  await mkdir(path.dirname(options.manifestPath), { recursive: true });
  await writeFile(options.archivePath, archive);
  await writeFile(
    options.manifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  return {
    zipSha256: digest(archive),
    manifestSha256: manifest.manifestSha256,
    files,
    manifest,
  };
}

export async function verifyCandidatePackage(options: {
  archivePath: string;
  manifestPath: string;
}): Promise<{
  zipSha256: string;
  manifestSha256: string;
  entries: ParsedZipEntry[];
}> {
  const archive = await readFile(options.archivePath);
  const parsed = parseAndVerifyZip(archive);
  const manifest = JSON.parse(
    await readFile(options.manifestPath, "utf8"),
  ) as PackageManifest;
  verifyManifest(manifest);
  const expectedPaths = byteSort(
    approvedRuntimeFiles.map((file) => `${pluginName}/${file}`),
  );
  if (
    JSON.stringify(parsed.entries.map((entry) => entry.path)) !==
    JSON.stringify(expectedPaths)
  ) {
    throw new Error("ZIP runtime whitelist mismatch");
  }
  for (const [index, entry] of parsed.entries.entries()) {
    const manifestFile = manifest.files[index];
    if (
      entry.path !== `${pluginName}/${manifestFile.relativePath}` ||
      entry.normalizedByteSize !== manifestFile.normalizedByteSize ||
      digest(entry.bytes) !== manifestFile.sha256 ||
      manifestFile.mode !== "0644"
    ) {
      throw new Error(`ZIP and manifest mismatch: ${entry.path}`);
    }
  }
  const forbiddenPattern =
    /(?:^|\/)(?:fixture|fixtures|test|tests|credentials?)(?:\/|$)|\.(?:pem|key|env|sql|sqlite|db|log)$/i;
  if (parsed.entries.some((entry) => forbiddenPattern.test(entry.path))) {
    throw new Error("package contains a forbidden runtime file");
  }
  return {
    zipSha256: digest(archive),
    manifestSha256: manifest.manifestSha256,
    entries: parsed.entries,
  };
}

export async function verifyApprovedPackage(options: {
  archivePath: string;
  manifestPath: string;
  approvalPath: string;
}): Promise<{
  approvedBy: string;
  approvedDate: string;
  sourceCommit: string | null;
  zipSha256: string;
  manifestSha256: string;
}> {
  let approval: PackageApproval;
  try {
    approval = JSON.parse(
      await readFile(options.approvalPath, "utf8"),
    ) as PackageApproval;
  } catch {
    throw new Error("approval missing");
  }
  if (
    approval.packageSchemaVersion !== packageSchemaVersion ||
    approval.packageFilename !== packageFilename ||
    !approval.approvedBy?.trim() ||
    !/^\d{4}-\d{2}-\d{2}$/.test(approval.approvedDate ?? "") ||
    !(
      approval.sourceCommit === null ||
      /^[a-f0-9]{7,40}$/i.test(approval.sourceCommit ?? "")
    )
  ) {
    throw new Error("approval record is invalid");
  }
  const candidate = await verifyCandidatePackage(options);
  if (approval.zipSha256 !== candidate.zipSha256) {
    throw new Error("approved ZIP hash mismatch");
  }
  if (approval.manifestSha256 !== candidate.manifestSha256) {
    throw new Error("approved manifest hash mismatch");
  }
  return {
    approvedBy: approval.approvedBy,
    approvedDate: approval.approvedDate,
    sourceCommit: approval.sourceCommit,
    zipSha256: candidate.zipSha256,
    manifestSha256: candidate.manifestSha256,
  };
}

export function defaultPackagePaths(root = process.cwd()): {
  sourceRoot: string;
  archivePath: string;
  manifestPath: string;
  approvalPath: string;
} {
  return {
    sourceRoot: path.join(
      root,
      "infra",
      "wordpress",
      "plugins",
      pluginName,
    ),
    archivePath: path.join(root, "dist", packageFilename),
    manifestPath: path.join(root, "dist", manifestFilename),
    approvalPath: path.join(
      root,
      "config",
      "multilingual-cms-import-package-approval.json",
    ),
  };
}
