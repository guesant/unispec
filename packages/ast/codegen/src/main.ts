import { GenNpmTypebox } from "./gen/npm/gen-npm-typebox";

const generators = [new GenNpmTypebox()];

for (const generator of generators) {
  await generator.generate();
}
