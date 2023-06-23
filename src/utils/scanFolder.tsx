import fs from "fs";

function scanFolder(folderPath: string): string[] {
  const files = fs.readdirSync(folderPath);
  const glbFiles = files.filter((file: string) => file.endsWith(".glb"));
  return glbFiles;
}

export default scanFolder;
