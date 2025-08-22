const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const packageJSON = require('./package.json');

const type = process.argv[2];
const pkgName = packageJSON.appConfig[type].name;
const moment = require('moment')

/** 打包别名 */
const ALIAS_MAP = {
  'mybricks-app-pcspa': 'mybricks-app-pcspa-react'
}

const zip = new JSZip();
/** 根目录 */
const rootDir = zip.folder(pkgName);
// /** 遍历文件 */
function read (zip, files, dirPath) {
  files.forEach(function (fileName) {
    const fillPath = dirPath + '/' + fileName;
    const file = fs.statSync(fillPath);
    if (file.isDirectory()) {
      const childDir = zip.folder(fileName);
      const files = fs.readdirSync(fillPath)
      read(childDir, files, fillPath);
    } else {
      zip.file(fileName, fs.readFileSync(fillPath));
    }
  });
}

const zipDirPath = path.join(__dirname);
/** 过滤不打进zip包的文件名 */
const filterFileName = [
  '.github',
  '.DS_Store', 
  '.babelrc',
  '.npmrc',
  '.npmignore', 
  '.eslintrc.js', 
  '.prettierrc', 
  'package-lock.json',
  'yarn.lock',
  'pages',
  'mybricks-app-pcspa',
  '.idea',
  '.git',
  '.vscode',
  'sync.js',
  'sync_offline.js',
  'publish.js',
  '.github',
  "update_local_public.js"
];

const files = fs.readdirSync(zipDirPath).filter(filename => {
  return filterFileName.indexOf(filename) === -1 && filename.indexOf('.zip') === -1;
});

read(rootDir, files, zipDirPath);

zip.generateAsync({
  type: 'nodebuffer',
  compression: 'DEFLATE',
  compressionOptions: {
    level: 9
  }
}).then((content) => {
  const fileName = `${ALIAS_MAP[pkgName] ?? pkgName}-${moment().format('YYYY-MM-DD-HH-mm-ss')}.zip`;
  fs.writeFileSync(path.join(__dirname, `./${fileName}`), content, 'utf-8');
  console.log(`离线包打包完成，请将 ${fileName} 拖拽到平台进行离线安装`);
});
