export type ViteCommonConfigOptions = {
  pkg: string;

  root?: string;
  source?: string;
  output?: string;
  workspace?: string;

  clearOutputDir?: boolean;
  copyAssets?: boolean;
};
