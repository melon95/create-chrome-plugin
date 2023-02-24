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
    compiler.hooks.done.tap(
      'ManifestWebpackPlugin',
      (stats /* 绑定 done 钩子后，stats 会作为参数传入。 */) => {
        fs.writeFileSync(
          manifestDistPath,
          JSON.stringify(this.manifestJson, null, 2)
        )
      }
    )
  }
}

module.exports = ManifestWebpackPlugin
