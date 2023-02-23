# Browser Plugin Cli

通过使用 React 以及 React 的生态 快速创建一个浏览器插件

在 src 下采用约定式目录：

- popup: 浏览器插件的 popup 页面
- contentScript: 浏览器插件中的 content script 脚本
- background: 浏览器插件中的 server worker 脚本

## TODO

- [ ] 配置文件来源
  - manifest.json（根目录下）
  - package.json
    - manifest 字段
- [ ] 构建优化
  - 避免公共模块
- [ ] 命令式创建
- [ ] 自动构建
