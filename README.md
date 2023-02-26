# Chrome Plugin Cli

通过使用 React 以及 React 的生态 快速创建一个[浏览器插件](https://developer.chrome.com/docs/extensions/mv3/)

> 只支持 manifest v3 版本

## 目录结构

在 src 下采用约定式目录：

- action: 浏览器插件的 action 页面
- contentScript: 浏览器插件中的 content script 脚本
- background: 浏览器插件中的 server worker 脚本

## 脚手架

通过执行 `npx @melon_did/create-chrome-plugin name` 来快速创建一个项目

> 如果 name 文件夹存在并且不为空，会强制把 name 文件夹清空

## TODO

- [x] 命令式创建
- [ ] 模板抽离
- [ ] 自动构建
