console.log("update_local_public");

const fs = require("fs");
const axios = require("axios");
const path = require("path");

const { default: localPublic } = require("./nodejs/module/service/local-public.ts");

function directoryExists(dirPath) {
  try {
    fs.accessSync(dirPath);
    return true;
  } catch (error) {
    return false;
  }
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // 如果是子文件夹
        deleteFolderRecursive(curPath); // 递归删除
      } else {
        // 如果是文件
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(folderPath); // 删除文件夹本身
    console.log(`已删除文件夹: ${folderPath}`);
  }
}

function writeFileWithDirectoryCreation(filePath, data) {
  const dirs = path.dirname(filePath).split(path.sep);
  let currentDir = __dirname;

  for (const dir of dirs) {
    currentDir = path.join(currentDir, dir);

    if (!directoryExists(currentDir)) {
      fs.mkdirSync(currentDir);
    }
  }

  try {
    fs.writeFileSync(filePath, data);
    console.log(`文件已成功写入：${filePath}`);
  } catch (err) {
    console.error(`无法写入文件：${filePath}`, err);
  }
}

async function update(list, basePath) {
  const contentList = (
    await Promise.all(list.map((item) => axios.get(item.CDN)))
  ).map((res) => res.data);

  contentList.forEach((content, index) => {
    writeFileWithDirectoryCreation(
      path.join(basePath, list[index].path),
      content
    );
  });
}

deleteFolderRecursive(
  path.resolve(__dirname, "pages/packages/react/templates/public")
);
// deleteFolderRecursive(path.resolve(__dirname, "pages/packages/vue2/templates/public"))

update(localPublic.react, "pages/packages/react/templates");
// update(localPublic.vue2, "pages/packages/vue2/templates");

update(localPublic.others.react, "pages/packages/react/templates");
// update(localPublic.others.vue2, "pages/packages/vue2/templates");
