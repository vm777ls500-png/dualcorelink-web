import { WordPressDataError } from "./errors";

export type BuildLogEntry = {
  level: "info" | "warn" | "error";
  code: string;
  message: string;
  endpoint?: string;
  status?: number;
  contentType?: string;
  contentId?: number;
  field?: string;
};

export function toBuildLogEntry(error: unknown): BuildLogEntry {
  if (error instanceof WordPressDataError) {
    return {
      level: "error",
      code: error.code,
      message: error.message,
      ...error.context,
    };
  }

  return {
    level: "error",
    code: "UNEXPECTED_BUILD_ERROR",
    message: error instanceof Error ? error.message : "Unknown build error",
  };
}

export function formatBuildLog(error: unknown): string {
  return JSON.stringify(toBuildLogEntry(error));
}
