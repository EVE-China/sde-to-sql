import * as fs from "fs";

copyResources('src', 'dist');

/**
 * 将src中的资源文件复制到dist中
 * 
 * @param src src目录
 * @param dist dist目录
 */
function copyResources(src: string, dist: string): void {
  fs.opendirSync(src).readSync()
  const dirs = fs.readdirSync(src);
  for (const dir of dirs) {
    const srcPath = `${src}/${dir}`;
    const distPath = `${dist}/${dir}`;
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyResources(srcPath, distPath);
    }
    if (!stat.isFile()) {
      continue;
    }
    // 目前只需要复制sql
    if (dir.endsWith('.sql')) {
      fs.copyFileSync(srcPath, distPath);
    }
  }
}