import { repositoryMediaConcurrency, wordpressClient } from "./config";
import { createProductRepository } from "./product-repository";
import { createSolutionRepository } from "./solution-repository";
import { createDownloadRepository } from "./download-repository";
import { createFaqRepository } from "./faq-repository";
import { createPageRepository } from "./page-repository";
import { createRegionRepository } from "./region-repository";

export { createProductRepository } from "./product-repository";
export { createSolutionRepository } from "./solution-repository";
export { createDownloadRepository } from "./download-repository";
export { createFaqRepository } from "./faq-repository";
export { createPageRepository } from "./page-repository";
export { createRegionRepository } from "./region-repository";

export const productRepository = createProductRepository(
  wordpressClient,
  repositoryMediaConcurrency,
);

export const solutionRepository = createSolutionRepository(
  wordpressClient,
  repositoryMediaConcurrency,
);

export const faqRepository = createFaqRepository(wordpressClient);
export const downloadRepository = createDownloadRepository(
  wordpressClient,
  repositoryMediaConcurrency,
);
export const regionRepository = createRegionRepository(
  wordpressClient,
  repositoryMediaConcurrency,
);
export const pageRepository = createPageRepository(wordpressClient);
