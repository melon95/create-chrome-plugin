#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')

const getProjectName = () => {
  return process.argv[2]
}

const projectnName = getProjectName()
const projectFolderPath = path.resolve(process.cwd(), projectnName)

const fileOpereate = {
  ensureProjectFolderPath(path) {
    fs.emptyDirSync(path)
  },
  copyFileToProject() {
    const ignoreFolder = ['bin', 'node_modules', 'dist', '.git']
    const rootPath = path.resolve(__dirname, '../')
    fs.copySync(rootPath, projectFolderPath, {
      filter(src, dest) {
        const srcPath = src.split('/')
        return !ignoreFolder.includes(srcPath[srcPath.length - 1])
      }
    })
  }
}

function initialize() {
  fileOpereate.ensureProjectFolderPath(projectFolderPath)
  fileOpereate.copyFileToProject()
}

initialize()
