# 语音聊天项目

项目由 Electron 桌面端、NestJS 服务端和预留的 Rust/WASM 模块组成。

```text
front/       Electron + React 桌面端
server/      NestJS API 服务
rust_wasm/   Rust/WASM 预留目录，目前为空
```

## 桌面端

在 `front` 目录安装依赖并启动：

```bash
npm install
npm run dev
```

生产构建使用 `npm run build`，启动构建后的 Electron 应用使用 `npm run start`。桌面端所有 npm 依赖安装在 `front/node_modules`。

## 服务端

在 `server` 目录安装依赖并启动开发服务：

```bash
npm install
npm run start:dev
```

服务端环境变量和数据库配置见 [server/README.md](server/README.md)。

## Rust/WASM

`rust_wasm` 暂作为后续 Rust/WASM 功能的目录，目前没有源码或构建流程。