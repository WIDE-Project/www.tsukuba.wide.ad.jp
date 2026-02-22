import { mkdir, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

const copyTargets = [
  {
    src: "node_modules/swiper/swiper-bundle.min.css",
    dest: "static/vendor/swiper/swiper-bundle.min.css"
  },
  {
    src: "node_modules/swiper/swiper-bundle.min.js",
    dest: "static/vendor/swiper/swiper-bundle.min.js"
  },
  {
    src: "node_modules/swiper/LICENSE",
    dest: "static/vendor/licenses/swiper-LICENSE.txt"
  },
  {
    src: "node_modules/@fontsource/m-plus-1p/LICENSE",
    dest: "static/vendor/licenses/m-plus-1p-LICENSE.txt"
  },
  {
    src: "node_modules/@fontsource/source-code-pro/LICENSE",
    dest: "static/vendor/licenses/source-code-pro-LICENSE.txt"
  },
  {
    src: "node_modules/@fontsource/m-plus-1p/files/m-plus-1p-japanese-400-normal.woff2",
    dest: "static/fonts/m-plus-1p-japanese-400-normal.woff2"
  },
  {
    src: "node_modules/@fontsource/m-plus-1p/files/m-plus-1p-latin-400-normal.woff2",
    dest: "static/fonts/m-plus-1p-latin-400-normal.woff2"
  },
  {
    src: "node_modules/@fontsource/m-plus-1p/files/m-plus-1p-japanese-500-normal.woff2",
    dest: "static/fonts/m-plus-1p-japanese-500-normal.woff2"
  },
  {
    src: "node_modules/@fontsource/m-plus-1p/files/m-plus-1p-latin-500-normal.woff2",
    dest: "static/fonts/m-plus-1p-latin-500-normal.woff2"
  },
  {
    src: "node_modules/@fontsource/m-plus-1p/files/m-plus-1p-japanese-700-normal.woff2",
    dest: "static/fonts/m-plus-1p-japanese-700-normal.woff2"
  },
  {
    src: "node_modules/@fontsource/m-plus-1p/files/m-plus-1p-latin-700-normal.woff2",
    dest: "static/fonts/m-plus-1p-latin-700-normal.woff2"
  },
  {
    src: "node_modules/@fontsource/source-code-pro/files/source-code-pro-latin-400-normal.woff2",
    dest: "static/fonts/source-code-pro-latin-400-normal.woff2"
  },
  {
    src: "node_modules/@fontsource/source-code-pro/files/source-code-pro-latin-700-normal.woff2",
    dest: "static/fonts/source-code-pro-latin-700-normal.woff2"
  }
];

const copyOne = async ({ src, dest }) => {
  const srcPath = join(rootDir, src);
  const destPath = join(rootDir, dest);
  await mkdir(dirname(destPath), { recursive: true });
  await copyFile(srcPath, destPath);
  return dest;
};

const main = async () => {
  const copied = [];
  for (const target of copyTargets) {
    copied.push(await copyOne(target));
  }

  console.log(`Synced ${copied.length} asset files:`);
  copied.forEach((path) => console.log(`- ${path}`));
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
