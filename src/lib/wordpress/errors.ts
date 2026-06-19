export type WordPressErrorContext = {
  endpoint: string;
  status?: number;
  contentType?: string;
  contentId?: number;
  field?: string;
};

export class WordPressDataError extends Error {
  readonly code: string;
  readonly context: WordPressErrorContext;

  constructor(
    code: string,
    message: string,
    context: WordPressErrorContext,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "WordPressDataError";
    this.code = code;
    this.context = context;
  }
}
