const path = require('path')
const fs = require('fs')
const pageageJson = require('../package.json')
const { name, version, description, manifest } = pageageJson

const manifestRootPath = path.resolve(__dirname, '../manifest.json')
const manifestDistPath = path.resolve(__dirname, '../dist/manifest.json')

const defaultManifest = {
  action: {
    default_icon: 'icon.png',
    default_popup: 'popup.html',
    default_title: 'Plugin Cli'
  },
  permissions: [],
  background: {
    service_worker: 'background.js'
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['contentScript.js'],
      all_frames: true
    }
  ]
}
const defaultManifestVersion = {
  manifest_version: 3
}

const checkManifestInRoot = () => {
  return fs.existsSync(manifestRootPath)
}

const generatorManifestByDefault = () => {
  return Object.assign({}, defaultManifestVersion, defaultManifest)
}

const generatorManifestByPackage = () => {
  if (!manifest || typeof manifest !== 'object') {
    return generatorManifestByDefault()
  }
  return Object.assign({}, defaultManifestVersion, manifest, {
    name,
    version,
    description
  })
}

const generatorManifestByRoot = () => {
  if (!checkManifestInRoot()) {
    return generatorManifestByPackage()
  }
  const rootManifest = JSON.parse(fs.readFileSync(manifestRootPath).toString())
  return Object.assign({}, defaultManifestVersion, rootManifest, {
    name,
    version,
    description
  })
}

const generatorManifest = () => {
  return generatorManifestByRoot()
}

class ManifestWebpackPlugin {
  constructor() {
    this.manifestJson = generatorManifest()
  }

  apply(compiler) {
    const pluginName = ManifestWebpackPlugin.name

    // webpack 模块实例，可以通过 compiler 对象访问，
    // 这样确保使用的是模块的正确版本
    // （不要直接 require/import webpack）
    const { webpack } = compiler

    // Compilation 对象提供了对一些有用常量的访问。
    const { Compilation } = webpack

    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources

    // 绑定到 “thisCompilation” 钩子，
    // 以便进一步绑定到 compilation 过程更早期的阶段
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      // 绑定到资源处理流水线(assets processing pipeline)
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,

          // 用某个靠后的资源处理阶段，
          // 确保所有资源已被插件添加到 compilation
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        (assets) => {
          // 向 compilation 添加新的资源，
          // 这样 webpack 就会自动生成并输出到 output 目录
          compilation.emitAsset(
            'manifest.json',
            new RawSource(JSON.stringify(this.manifestJson, null, 2))
          )
        }
      )
    })
  }
}

module.exports = ManifestWebpackPlugin
