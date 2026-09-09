export const CATALOG_CONFIG = {
  BASE_URL:
    process.env.EXPO_PUBLIC_CATALOG_URL ||
    'https://raw.githubusercontent.com/kcaiosouza/hinarioeav-igcg/main',
  VERSION_PATH: '/data/catalogVersion.json',
  DATA_PATH: '/data/hinosData.json',
  STORAGE_KEYS: {
    CATALOG_VERSION: '@hinos_catalog_version',
  },
  CHECK_TIMEOUT_MS: 5000,
} as const;

export interface CatalogVersionMetadata {
  version: string;
  updatedAt: string;
  description?: string;
}
