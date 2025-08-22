const shelljs = require("shelljs")
const pkgJson = require("./package.json")
const fs = require("fs")
const path = require('path')
const args = process.argv.slice(2)
const isOffline = !!args.find((a) => a === "offline")
const noServiceUpdate = !!args.find((a) => a === "--noServiceUpdate")
const origin =
  args.find((a) => a.startsWith("--origin=")) ??
  "--origin=https://my.mybricks.world"

const ClearFiles = ['mybricks-app-pcspa', 'mybricks-app-pcspa-vue2']

const publishReactAppOffline = () => {
  return new Promise((resolve) => {
    const buildCommand = `cd pages && npm run build:react-offline`
    shelljs.exec(buildCommand, () => {
      const syncCommand = `node sync_offline.js react`
      shelljs.exec(syncCommand, resolve)
    })
  })
}

const publishVue2AppOffline = () => {
  return new Promise((resolve) => {
    const buildCommand = `cd pages && npm run build:vue2-offline`
    shelljs.exec(buildCommand, () => {
      const syncCommand = `node sync_offline.js vue2`
      shelljs.exec(syncCommand, resolve)
    })
  })
}

const publishReactAppOnline = () => {
  return new Promise((resolve) => {
    const buildCommand = `cd pages && npm run build:react`
    shelljs.exec(buildCommand, () => {
      const syncCommand = `node sync.js ${origin} --appType=react ${noServiceUpdate ? "--noServiceUpdate" : ""
        }`
      shelljs.exec(syncCommand, resolve)
    })
  })
}

const publishVue2AppOnline = () => {
  return new Promise((resolve) => {
    const buildCommand = `cd pages && npm run build:vue2`
    shelljs.exec(buildCommand, () => {
      const syncCommand = `npm publish --registry=https://registry.npmjs.org && node sync.js ${origin} --appType=vue2 ${noServiceUpdate ? "--noServiceUpdate" : ""
        }`
      shelljs.exec(syncCommand, resolve)
    })
  })
}

const publishVue3AppOffline = () => {
  return new Promise((resolve) => {
    const buildCommand = `cd pages && npm run build:vue3-offline`
    shelljs.exec(buildCommand, () => {
      const syncCommand = `node sync_offline.js vue3`
      shelljs.exec(syncCommand, resolve)
    })
  })
}

const fixPkg = (appType) => {
  return new Promise((resolve) => {
    const json = { ...pkgJson }
    json.name = json.appConfig[appType].name;
    json.description = json.appConfig[appType].description;
    json.version = json.appConfig[appType].version;
    json.mybricks = json.appConfig[appType].mybricks;
    fs.writeFileSync("./package.json", JSON.stringify(json, null, 2))
    resolve()
  })
}

const resetPkg = () => {
  fs.writeFileSync("./package.json", JSON.stringify(pkgJson, null, 2))
}

const clearZipPkg = () => {
  const dirPath = path.resolve(__dirname)
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    if (ClearFiles.some(filename => file.includes(filename)) && file.endsWith('.zip')) {
      fs.unlinkSync(path.join(dirPath, file))
    }
  })
}

const execChain = (fns) => {
  fns.reduce((chain, fn) => chain.then(fn), Promise.resolve())
}

if (isOffline) {
  execChain([
    clearZipPkg,
    fixPkg('react'),
    publishReactAppOffline,
    // fixPkg('vue3'),
    // publishVue3AppOffline,
    // resetPkg,
    // fixPkg('vue2'),
    // publishVue2AppOffline,
    resetPkg
  ])
} else {
  execChain([
    fixPkg('react'),
    publishReactAppOnline,
    resetPkg
    // fixPkg('vue3'),
    // publishVue3AppOffline,
    // resetPkg
  ])
}
