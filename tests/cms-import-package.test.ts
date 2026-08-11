import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  chmod,
  cp,
  lstat,
  mkdtemp,
  readFile,
  rm,
  symlink,
  unlink,
  utimes,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  approvedRuntimeFiles,
  collectNormalizedFiles,
  createDeterministicZip,
  defaultPackagePaths,
  fixedCompressionMethod,
  fixedDosDate,
  fixedDosTime,
  fixedFileMode,
  normalizeRelativePath,
  normalizeTextBytes,
  packageFilename,
  packageSchemaVersion,
  pluginVersion,
  parseAndVerifyZip,
  verifyApprovedPackage,
  verifyCandidatePackage,
  writeCandidatePackage,
} from "../scripts/cms-import/deterministic-package";

function sha256(bytes: Buffer | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

async function temporaryRoot(label: string): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), `dualcorelink-${label}-`));
}

async function copyPlugin(root: string, name = "plugin"): Promise<string> {
  const source = defaultPackagePaths().sourceRoot;
  const target = path.join(root, name);
  await cp(source, target, { recursive: true });
  return target;
}

async function buildAt(root: string, sourceRoot: string, name: string) {
  const archivePath = path.join(root, name, "candidate.zip");
  const manifestPath = path.join(root, name, "candidate.manifest.json");
  return {
    ...(await writeCandidatePackage({
      sourceRoot,
      archivePath,
      manifestPath,
    })),
    archivePath,
    manifestPath,
  };
}

async function withTemporaryRoot(
  label: string,
  callback: (root: string) => Promise<void>,
): Promise<void> {
  const root = await temporaryRoot(label);
  try {
    await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

function patchAll(
  input: Buffer,
  before: Buffer,
  after: Buffer,
): Buffer {
  assert.equal(before.length, after.length);
  const output = Buffer.from(input);
  let offset = 0;
  let count = 0;
  while ((offset = output.indexOf(before, offset)) >= 0) {
    after.copy(output, offset);
    offset += after.length;
    count += 1;
  }
  assert.ok(count >= 2);
  return output;
}

test("runtime sources are complete and identify plugin version 1.4.0", async () => {
  assert.equal(pluginVersion, "1.4.0");
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  for (const file of files) {
    const text = file.bytes.toString("utf8");
    assert.doesNotMatch(text, /tokens truncated|truncated|…[0-9]+ tokens/u);
  }
  const pluginHeader = files.find(
    (file) => file.relativePath === "dualcorelink-multilingual-import-cli.php",
  );
  assert.ok(pluginHeader);
  assert.match(pluginHeader.bytes.toString("utf8"), /Version: 1\.4\.0/);
  const phpHarness = await readFile(
    path.join(process.cwd(), "tests", "cms-import-php", "run.php"),
    "utf8",
  );
  assert.doesNotMatch(
    phpHarness,
    /tokens truncated|truncated|…[0-9]+ tokens/u,
  );
});

test("three consecutive clean builds have identical ZIP and manifest hashes", async () => {
  await withTemporaryRoot("triple", async (root) => {
    const sourceRoot = await copyPlugin(root);
    const builds = await Promise.all([
      buildAt(root, sourceRoot, "one"),
      buildAt(root, sourceRoot, "two"),
      buildAt(root, sourceRoot, "three"),
    ]);
    assert.equal(new Set(builds.map((build) => build.zipSha256)).size, 1);
    assert.equal(
      new Set(builds.map((build) => build.manifestSha256)).size,
      1,
    );
  });
});

test("different staging directory names do not affect the package", async () => {
  await withTemporaryRoot("paths", async (root) => {
    const first = await copyPlugin(root, "short");
    const second = await copyPlugin(root, "different-staging-directory-name");
    const firstBuild = await buildAt(root, first, "first");
    const secondBuild = await buildAt(root, second, "second");
    assert.equal(firstBuild.zipSha256, secondBuild.zipSha256);
    assert.equal(firstBuild.manifestSha256, secondBuild.manifestSha256);
  });
});

test("input mtimes do not affect the package", async () => {
  await withTemporaryRoot("mtime", async (root) => {
    const first = await copyPlugin(root, "first");
    const second = await copyPlugin(root, "second");
    for (const file of approvedRuntimeFiles) {
      await utimes(
        path.join(second, ...file.split("/")),
        new Date("2035-06-07T08:09:10Z"),
        new Date("2035-06-07T08:09:10Z"),
      );
    }
    assert.equal(
      (await buildAt(root, first, "first-out")).zipSha256,
      (await buildAt(root, second, "second-out")).zipSha256,
    );
  });
});

test("input file modes do not affect the package", async () => {
  await withTemporaryRoot("mode", async (root) => {
    const first = await copyPlugin(root, "first");
    const second = await copyPlugin(root, "second");
    for (const file of approvedRuntimeFiles) {
      await chmod(path.join(first, ...file.split("/")), 0o600);
      await chmod(path.join(second, ...file.split("/")), 0o666);
    }
    assert.equal(
      (await buildAt(root, first, "first-out")).zipSha256,
      (await buildAt(root, second, "second-out")).zipSha256,
    );
  });
});

test("input array order does not affect ZIP bytes", async () => {
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  assert.equal(
    sha256(createDeterministicZip(files)),
    sha256(createDeterministicZip([...files].reverse())),
  );
});

test("Windows and POSIX separators normalize to the same entry path", () => {
  assert.equal(
    normalizeRelativePath("includes\\class-config.php"),
    normalizeRelativePath("includes/class-config.php"),
  );
});

test("CRLF, LF and BOM inputs normalize to the same bytes", () => {
  const lf = Buffer.from("alpha\nbeta\n", "utf8");
  const crlf = Buffer.from("\ufeffalpha\r\nbeta\r\n\r\n", "utf8");
  assert.deepEqual(normalizeTextBytes(lf), normalizeTextBytes(crlf));
  assert.equal(normalizeTextBytes(lf).toString("utf8"), "alpha\nbeta\n");
});

test("changing one source byte changes the ZIP hash", async () => {
  await withTemporaryRoot("byte-zip", async (root) => {
    const source = await copyPlugin(root);
    const before = await buildAt(root, source, "before");
    const target = path.join(source, approvedRuntimeFiles[0]);
    await writeFile(target, `${await readFile(target, "utf8")}\n// changed\n`);
    const after = await buildAt(root, source, "after");
    assert.notEqual(before.zipSha256, after.zipSha256);
  });
});

test("changing one source byte changes its manifest file hash", async () => {
  await withTemporaryRoot("byte-manifest", async (root) => {
    const source = await copyPlugin(root);
    const before = await buildAt(root, source, "before");
    const target = path.join(source, approvedRuntimeFiles[1]);
    await writeFile(target, `${await readFile(target, "utf8")}\n// changed\n`);
    const after = await buildAt(root, source, "after");
    const beforeHash = before.manifest.files.find(
      (file) => file.relativePath === approvedRuntimeFiles[1],
    )?.sha256;
    const afterHash = after.manifest.files.find(
      (file) => file.relativePath === approvedRuntimeFiles[1],
    )?.sha256;
    assert.notEqual(beforeHash, afterHash);
  });
});

test("an unexpected tenth runtime file fails closed", async () => {
  await withTemporaryRoot("extra", async (root) => {
    const source = await copyPlugin(root);
    await writeFile(path.join(source, "unexpected.php"), "<?php\n");
    await assert.rejects(
      collectNormalizedFiles(source),
      /package whitelist mismatch/,
    );
  });
});

test("a missing approved runtime file fails closed", async () => {
  await withTemporaryRoot("missing", async (root) => {
    const source = await copyPlugin(root);
    await unlink(path.join(source, approvedRuntimeFiles[0]));
    await assert.rejects(
      collectNormalizedFiles(source),
      /package whitelist mismatch/,
    );
  });
});

test("path traversal inside the ZIP fails verification", async () => {
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  const archive = createDeterministicZip(files);
  const original = Buffer.from(files[0].archivePath, "utf8");
  const unsafe = Buffer.from(`../${"x".repeat(original.length - 3)}`, "utf8");
  assert.throws(
    () => parseAndVerifyZip(patchAll(archive, original, unsafe)),
    /unsafe package path/,
  );
});

test("symbolic-link input fails closed", async () => {
  await withTemporaryRoot("symlink", async (root) => {
    const source = await copyPlugin(root);
    const target = path.join(source, "includes");
    const link = path.join(source, "linked-includes");
    await symlink(target, link, process.platform === "win32" ? "junction" : "dir");
    assert.ok((await lstat(link)).isSymbolicLink());
    await assert.rejects(
      collectNormalizedFiles(source),
      /symbolic links are forbidden/,
    );
  });
});

test("ZIP extra fields fail verification", async () => {
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  const archive = createDeterministicZip(files);
  const tampered = Buffer.from(archive);
  const endOffset = tampered.length - 22;
  const centralOffset = tampered.readUInt32LE(endOffset + 16);
  tampered.writeUInt16LE(1, centralOffset + 30);
  assert.throws(() => parseAndVerifyZip(tampered), /extra fields/);
});

test("ZIP archive comments fail verification", async () => {
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  const archive = createDeterministicZip(files);
  const tampered = Buffer.concat([archive, Buffer.from("x")]);
  tampered.writeUInt16LE(1, archive.length - 2);
  assert.throws(() => parseAndVerifyZip(tampered), /comment must be empty/);
});

test("non-fixed ZIP timestamps fail verification", async () => {
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  const archive = createDeterministicZip(files);
  const tampered = Buffer.from(archive);
  const endOffset = tampered.length - 22;
  const centralOffset = tampered.readUInt32LE(endOffset + 16);
  tampered.writeUInt16LE(1, centralOffset + 12);
  assert.throws(() => parseAndVerifyZip(tampered), /timestamp is not fixed/);
});

test("non-fixed ZIP modes fail verification", async () => {
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  const archive = createDeterministicZip(files);
  const tampered = Buffer.from(archive);
  const endOffset = tampered.length - 22;
  const centralOffset = tampered.readUInt32LE(endOffset + 16);
  tampered.writeUInt32LE((0o100600 << 16) >>> 0, centralOffset + 38);
  assert.throws(() => parseAndVerifyZip(tampered), /mode is not fixed/);
});

test("package generation does not modify an approval record", async () => {
  await withTemporaryRoot("approval-preserve", async (root) => {
    const source = await copyPlugin(root);
    const approvalPath = path.join(root, "approval.json");
    const evidence = '{"status":"pending"}\n';
    await writeFile(approvalPath, evidence);
    await buildAt(root, source, "candidate");
    assert.equal(await readFile(approvalPath, "utf8"), evidence);
  });
});

test("candidate verification does not self-approve the current hash", async () => {
  await withTemporaryRoot("no-self-approval", async (root) => {
    const source = await copyPlugin(root);
    const candidate = await buildAt(root, source, "candidate");
    await verifyCandidatePackage(candidate);
    await assert.rejects(
      readFile(path.join(root, "approval.json")),
      /ENOENT/,
    );
  });
});

test("an incorrect approved ZIP hash fails", async () => {
  await withTemporaryRoot("bad-approved-zip", async (root) => {
    const source = await copyPlugin(root);
    const candidate = await buildAt(root, source, "candidate");
    const approvalPath = path.join(root, "approval.json");
    await writeFile(
      approvalPath,
      `${JSON.stringify({
        packageSchemaVersion,
        packageFilename,
        zipSha256: "0".repeat(64),
        manifestSha256: candidate.manifestSha256,
        approvedBy: "Test Reviewer",
        approvedDate: "2026-07-29",
        sourceCommit: "c5ac345",
      })}\n`,
    );
    await assert.rejects(
      verifyApprovedPackage({ ...candidate, approvalPath }),
      /approved ZIP hash mismatch/,
    );
  });
});

test("an incorrect approved manifest hash fails", async () => {
  await withTemporaryRoot("bad-approved-manifest", async (root) => {
    const source = await copyPlugin(root);
    const candidate = await buildAt(root, source, "candidate");
    const approvalPath = path.join(root, "approval.json");
    await writeFile(
      approvalPath,
      `${JSON.stringify({
        packageSchemaVersion,
        packageFilename,
        zipSha256: candidate.zipSha256,
        manifestSha256: "0".repeat(64),
        approvedBy: "Test Reviewer",
        approvedDate: "2026-07-29",
        sourceCommit: "c5ac345",
      })}\n`,
    );
    await assert.rejects(
      verifyApprovedPackage({ ...candidate, approvalPath }),
      /approved manifest hash mismatch/,
    );
  });
});

test("a missing approval record fails", async () => {
  await withTemporaryRoot("missing-approval", async (root) => {
    const source = await copyPlugin(root);
    const candidate = await buildAt(root, source, "candidate");
    await assert.rejects(
      verifyApprovedPackage({
        ...candidate,
        approvalPath: path.join(root, "missing.json"),
      }),
      /approval missing/,
    );
  });
});

test("a correct isolated approval fixture passes", async () => {
  await withTemporaryRoot("approved-fixture", async (root) => {
    const source = await copyPlugin(root);
    const candidate = await buildAt(root, source, "candidate");
    const approvalPath = path.join(root, "approval.json");
    await writeFile(
      approvalPath,
      `${JSON.stringify({
        packageSchemaVersion,
        packageFilename,
        zipSha256: candidate.zipSha256,
        manifestSha256: candidate.manifestSha256,
        approvedBy: "Test Reviewer",
        approvedDate: "2026-07-29",
        sourceCommit: "c5ac345",
      })}\n`,
    );
    const result = await verifyApprovedPackage({
      ...candidate,
      approvalPath,
    });
    assert.equal(result.zipSha256, candidate.zipSha256);
    assert.equal(result.manifestSha256, candidate.manifestSha256);
  });
});

test("an approved uncommitted candidate may record a null source commit", async () => {
  await withTemporaryRoot("approved-null-commit", async (root) => {
    const source = await copyPlugin(root);
    const candidate = await buildAt(root, source, "candidate");
    const approvalPath = path.join(root, "approval.json");
    await writeFile(
      approvalPath,
      `${JSON.stringify({
        packageSchemaVersion,
        packageFilename,
        zipSha256: candidate.zipSha256,
        manifestSha256: candidate.manifestSha256,
        approvedBy: "Allan",
        approvedDate: "2026-07-29",
        sourceCommit: null,
      })}\n`,
    );
    const result = await verifyApprovedPackage({
      ...candidate,
      approvalPath,
    });
    assert.equal(result.sourceCommit, null);
  });
});

test("candidate manifest tampering fails independently", async () => {
  await withTemporaryRoot("manifest-tamper", async (root) => {
    const source = await copyPlugin(root);
    const candidate = await buildAt(root, source, "candidate");
    const manifest = JSON.parse(
      await readFile(candidate.manifestPath, "utf8"),
    ) as { files: Array<{ normalizedByteSize: number }> };
    manifest.files[0].normalizedByteSize += 1;
    await writeFile(
      candidate.manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
    await assert.rejects(
      verifyCandidatePackage(candidate),
      /manifest SHA-256 mismatch/,
    );
  });
});

test("candidate contains exactly nine approved runtime files and no manifest", async () => {
  const files = await collectNormalizedFiles(defaultPackagePaths().sourceRoot);
  const parsed = parseAndVerifyZip(createDeterministicZip(files));
  assert.equal(parsed.entries.length, 9);
  assert.deepEqual(
    parsed.entries.map((entry) => entry.path),
    [...parsed.entries.map((entry) => entry.path)].sort((left, right) =>
      Buffer.from(left).compare(Buffer.from(right)),
    ),
  );
  assert.ok(
    parsed.entries.every(
      (entry) =>
        entry.dosTime === fixedDosTime &&
        entry.dosDate === fixedDosDate &&
        entry.mode === fixedFileMode &&
        entry.compressionMethod === fixedCompressionMethod &&
        !entry.path.endsWith(".manifest.json"),
    ),
  );
});

test("ordinary npm build does not package or write CMS data", async () => {
  const packageJson = JSON.parse(
    await readFile(path.join(process.cwd(), "package.json"), "utf8"),
  ) as { scripts: Record<string, string> };
  assert.doesNotMatch(packageJson.scripts.build, /cms-import|package-plugin/);
  assert.doesNotMatch(
    packageJson.scripts.build,
    /apply|verify-approved-package|publish|rollback/,
  );
});
