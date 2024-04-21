## 文章概述

## 关键词


## 本文难度为入门级别，涉及到的技术点

- 前端开发对 electron 开发的理解
- 使用 electron-vite 初始化项目
- indexDb 在 vue3 的使用
- 剪切板功能的实现
- 完整流程（发布



## npm run build
```bash
vue-tsc --noEmit && vite build && electron-builder
```

分为三部分
- ts 类型检查，不输出任何文件
- 生成文件，其中 renderer 生成到 dist; main 和 preload 生成到 dist-electron;
- electron-builder 打包命令。

### electron-builder 
https://www.electron.build/

>  如果没有目标配置，电子构建器将使用默认目标为当前平台和当前架构构建 Electron 应用程序。

```js

```