/// <reference types='vitest' />
import { getViteCommonConfig } from "../-shared/vite.config.mjs";

const pkg = "core";
const root = __dirname;
const workspace = `../..`;
const source = `${root}/src`;
const output = `../../dist/packages/${pkg}`;

export default getViteCommonConfig({
  pkg,
  root,
  source,
  output,
  workspace,
});
