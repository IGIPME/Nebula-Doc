# Nebula 介绍

Nebula 是一款针对**微纳米光子器件设计与系统设计**的 EDA（电子设计自动化）平台，采用 **React + Rust** 技术栈构建。

## 核心架构

Nebula 由以下核心组件构成：

- **Rust 后端** — 包含模板引擎核心（`nebula-core`）、命令行工具（`nebula-cli`）和 Axum HTTP 服务（`nebula-ffi`）
- **React 前端** — 基于 Vite + TypeScript + MUI 的 Web 界面，提供模板选择和项目脚手架功能
- **模板系统** — 使用 Tera 模板引擎，支持从模板快速初始化光子设计项目
- **仿真集成** — 通过 gRPC 对接 ANSYS Lumerical、Meep 等仿真引擎

## 功能亮点

### 项目脚手架

基于模板引擎快速创建新的光子设计项目。当前内置 `pic-design` 模板，支持：

- 模板变量渲染（项目名、作者、PDK 配置等）
- 路径安全验证（防止目录穿越攻击）
- Dry-run 预览模式
- 三种覆盖策略（报错 / 覆盖 / 跳过）

### CLI 命令行工具

```bash
# 列出可用模板
cargo run -p nebula-cli -- template list

# 从模板初始化项目
cargo run -p nebula-cli -- template init pic-design \
  --name MyProject \
  --author Alice \
  --output /path/to/projects

# 预览模式（不写入文件）
cargo run -p nebula-cli -- template init pic-design \
  --name MyProject --dry-run
```

### HTTP API 服务

基于 Axum 的 REST API 服务器，监听 `127.0.0.1:3030`，提供：

- 模板列表查询
- 模板元数据获取
- 项目创建（支持 camelCase JSON 请求）

### 仿真支持

Nebula 支持以下仿真引擎：

- **ANSYS Lumerical** — 通过 `grpcio` 构建的 gRPC 服务器进行仿真集成，服务端封装 `ansys/pylumerical`
- **Meep** — 开源电磁仿真支持

## 技术栈

| 领域 | 技术 |
|------|------|
| 后端 | Rust 1.96, Axum, Tera, Clap |
| 前端 | React 19, TypeScript, Vite, MUI |
| 模板 | Tera (Rust 模板引擎) |
| 容器化 | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## 下一步

- 阅读 [快速开始](/manual/start/getting-started) 安装并运行 Nebula
- 查阅 [开发指南](/develop/developmentguide) 了解如何参与开发
- 参考 [协议文档](/protocol/) 了解 API 接口
