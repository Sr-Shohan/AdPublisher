import { copyFile } from "fs/promises";
import path from "path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const fallbackPath = path.join(distDir, "404.html");

async function createSpaFallback() {
  await copyFile(indexPath, fallbackPath);
  console.log("created dist/404.html for SPA routing");
}

createSpaFallback().catch((err) => {
  console.error(err);
  process.exit(1);
});
