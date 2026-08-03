const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const targetDirs = ["src"];
const jsFiles = [];

function collectJsFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      collectJsFiles(fullPath);
      continue;
    }

    if (entry.isFile() && fullPath.endsWith(".js")) {
      jsFiles.push(fullPath);
    }
  }
}

for (const dir of targetDirs) {
  collectJsFiles(path.join(rootDir, dir));
}

for (const file of jsFiles) {
  execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
}

console.log(`Lint passed for ${jsFiles.length} files.`);
