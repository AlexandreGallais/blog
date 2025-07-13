import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const folderArg = process.argv[2];

if (!folderArg) {
  console.error('❌ Please provide a folder path as an argument.');
  process.exit(1);
}

const folderPath = resolve(process.cwd(), folderArg);
const indexFileName = 'index.txt';
const indexFilePath = join(folderPath, indexFileName);

if (!existsSync(folderPath) || !statSync(folderPath).isDirectory()) {
  console.error(
    `❌ The folder "${folderArg}" does not exist or is not a directory.`,
  );
  process.exit(1);
}

const files = readdirSync(folderPath).filter((file) => {
  const fullPath = join(folderPath, file);
  return (
    statSync(fullPath).isFile() &&
    extname(file) === '.md' &&
    file !== indexFileName
  );
});

const lines = [];

for (const file of files) {
  lines.push(file);
}

// Write index.txt
writeFileSync(indexFilePath, lines.join('\n') + '\n', 'utf8');

console.log(
  `✅ Created "${indexFileName}" with ${lines.length} Markdown file(s).`,
);
