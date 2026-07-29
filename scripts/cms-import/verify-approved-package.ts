import {
  defaultPackagePaths,
  verifyApprovedPackage,
} from "./deterministic-package";

function argument(name: string): string | undefined {
  const prefix = `${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(
    prefix.length,
  );
}

async function main(): Promise<void> {
  const paths = defaultPackagePaths();
  const approvalPath = argument("--approval") ?? paths.approvalPath;
  try {
    const result = await verifyApprovedPackage({ ...paths, approvalPath });
    console.log(JSON.stringify({ status: "approved", ...result }));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

void main();
