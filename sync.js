const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const axios = require('axios');
const FormData = require('form-data');
const packageJSON = require('./package.json');

const args = process.argv.slice(2);
const originArg = args.find(arg => arg.startsWith('--origin='))
if(!originArg) {
  console.log('发布应用失败，未配置发布源。');
  console.log('请按 node sync.js --origin=[域名] 规则配置，如：node sync.js --origin=https://my.mybricks.world');
  process.exit();
}
const domain = originArg.replace('--origin=', '');
const appTypeArg = args.find(arg => arg.startsWith('--appType='))
const appType = appTypeArg.replace('--appType=', '')

const noServiceUpdate = !!args.find(arg => arg==='--noServiceUpdate');
const offlineUpdate = !!args.find(arg => arg==='--offline');

/** 即将要发布的 app 信息 */
const nextAppConfig = packageJSON.appConfig[appType];

const appName = nextAppConfig.name

const zip = new JSZip();
/** 根目录 */
const rootDir = zip.folder(appName);
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
  '.idea',
  '.git',
  '.vscode',
  'sync.js',
  'sync_offline.js',
  "publish.js",
  "update_local_public.js"
];

if(!offlineUpdate) {
  filterFileName.push('node_modules')
}
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
  console.log('应用打包压缩完成，开始发布应用...');

  // fs.writeFileSync(path.join(__dirname, `./${appName}.zip`), content, 'utf-8');
  const formData = new FormData();
  formData.append('action', 'app_publishVersion');
  formData.append('userId', Buffer.from('em91eW9uZ3NoZW5nQGt1YWlzaG91LmNvbQ==', 'base64').toString('utf-8'));
  formData.append('payload', JSON.stringify({
    name: (nextAppConfig.mybricks ? nextAppConfig.mybricks.title : '') || appName,
    version: nextAppConfig.version,
    namespace: appName,
    type: 'app',
    installInfo: JSON.stringify({
      path: `/asset/app/${appName}/${nextAppConfig.version}/${appName}.zip`,
      changeLog: '优化部分逻辑，修复若干 bug',
      noServiceUpdate: noServiceUpdate
    }),
    creator_name: Buffer.from('em91eW9uZ3NoZW5nQGt1YWlzaG91LmNvbQ==', 'base64').toString('utf-8') || '',
    icon: nextAppConfig.mybricks ? nextAppConfig.mybricks.icon : '',
    description: nextAppConfig.mybricks ? (nextAppConfig.mybricks.description || nextAppConfig.description) : nextAppConfig.description,
    createTime: Date.now(),
  }));
  formData.append('file', content, `${appName}.zip`);

  // 发送请求
  axios
    .post(domain + '/central/api/channel/gateway', formData, {
      headers: formData.getHeaders()
    })
    .then(res => {
      if (res.data.code === 1) {
        console.log(res.data.message || '应用发布成功!');
      } else {
        throw new Error(res.data.message || '发布应用接口错误');
      }
    })
    .catch(error => {
      console.log('发布应用失败：', error.message);
    });
});
