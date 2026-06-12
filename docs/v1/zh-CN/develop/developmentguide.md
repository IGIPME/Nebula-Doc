# 开发指南

本文档面向 Nebula 项目的开发者，介绍项目结构、构建流程以及如何参与开发。

## 项目结构

```
Nebula/
├── src/
│   ├── crates/              # Rust 工作区
│   │   ├── core/            # nebula-core：模板引擎核心
│   │   │   ├── src/
│   │   │   │   ├── lib.rs           # 入口
│   │   │   │   └── template/
│   │   │   │       ├── mod.rs       # 公开接口
│   │   │   │       └── engine.rs    # 模板引擎实现
│   │   │   └── Cargo.toml
│   │   ├── cli/             # nebula-cli：命令行工具
│   │   │   ├── src/
│   │   │   │   ├── main.rs          # 入口
│   │   │   │   └── lib.rs           # CLI 逻辑
│   │   │   └── Cargo.toml
│   │   └── ffi/             # nebula-ffi：Axum HTTP 服务
│   │       ├── src/
│   │       │   ├── main.rs          # 服务器入口
│   │       │   └── lib.rs           # 路由与处理逻辑
│   │       └── Cargo.toml
│   ├── nebula/              # React 前端
│   │   ├── src/
│   │   │   ├── App.tsx              # 主组件
│   │   │   ├── api/                 # API 客户端
│   │   │   │   ├── client.ts
│   │   │   │   ├── templates.ts
│   │   │   │   ├── projects.ts
│   │   │   │   └── types.ts
│   │   │   └── components/          # UI 组件
│   │   └── package.json
│   └── python/lummcp/       # Python 包（占位）
├── templates/               # 项目模板
│   └── pic-design/          # PIC 设计模板
│       ├── template.toml    # 模板元数据
│       └── {{project-name}}/ # 模板文件
├── Cargo.toml               # Rust 工作区配置
├── docker-compose.yml       # 开发环境
└── nginx.conf               # 前端反向代理配置
```

## 工作区架构

Nebula 使用 Cargo workspace 管理三个 Rust crate：

| Crate | 包名 | 功能 |
|-------|------|------|
| `src/crates/core` | `nebula-core` | 模板引擎核心逻辑，包含模板加载、变量渲染、路径验证、项目初始化 |
| `src/crates/cli` | `nebula-cli` | 基于 clap 的命令行接口，封装 `nebula-core` |
| `src/crates/ffi` | `nebula-ffi` | 基于 Axum 的 HTTP 服务器，通过 REST API 暴露 `nebula-core` 功能 |

### 依赖关系

```
nebula-cli  ──→  nebula-core
nebula-ffi  ──→  nebula-core
```

`nebula-core` 是共享核心，CLI 和 HTTP 服务都依赖它。

## 构建与测试

### Rust 工作区

```bash
# 构建所有 crate
cargo build

# 运行所有测试
cargo test

# 运行特定 crate 的测试
cargo test -p nebula-core
cargo test -p nebula-cli
cargo test -p nebula-ffi

# 运行特定测试
cargo test <test_name>

# 格式化代码
cargo fmt --all

# Clippy 检查
cargo clippy --workspace --all-targets --all-features
```

### 运行二进制

```bash
# CLI 工具
cargo run -p nebula-cli -- template list
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject --output /tmp --author Alice --dry-run

# HTTP 服务器
cargo run -p nebula-ffi --bin nebula-server
NEBULA_SERVER_ADDR=127.0.0.1:3030 cargo run -p nebula-ffi --bin nebula-server
```

> **注意**：Rust 构建使用 `.cargo/config.toml`，指定了 `clang`/`lld` 作为 `x86_64-unknown-linux-gnu` 的链接器，并暴露 `CARGO_WORKSPACE_DIR` 用于模板嵌入。

### 前端

```bash
cd src/nebula

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 生产构建
pnpm build

# 代码检查
pnpm lint

# 预览生产构建
pnpm preview
```

前端开发默认连接 `http://127.0.0.1:3030` 的后端。可通过 `VITE_API_BASE_URL` 环境变量指定不同的后端地址。

## 模板系统

### 模板结构

模板位于 `templates/<模板名>/` 目录下，每个模板包含：

1. **`template.toml`** — 模板元数据文件
   ```toml
   [template]
   name = "模板名称"
   description = "模板描述"
   version = "1.0"

   [variables]
   var-name = { prompt = "变量说明", default = "默认值" }
   ```

2. **模板文件** — 使用 Tera 语法的文件和目录，支持 `{{ variable }}` 变量插值

### 添加新模板

1. 在 `templates/` 下创建新目录
2. 编写 `template.toml` 元数据
3. 创建模板文件，使用 `{{ }}` 标记变量
4. **重要**：模板在编译时嵌入到 Rust 二进制中，修改后需重新编译

### 变量规范

- 变量名支持连字符 `-` 和下划线 `_`
- 系统自动为两种格式创建别名（`project-name` ↔ `project_name`）
- 路径类变量（`project-name`、`*-name`、`*_name`）禁止包含 `/`、`\\`、`.`、`..`

## Docker 构建

```bash
# 构建后端镜像
docker build -f Dockerfile.backend -t nebula-server .

# 构建前端镜像
docker build -f Dockerfile.frontend -t nebula-frontend .

# 推送生产镜像
TAG=20260101 ./scripts/build.sh
```

## CI/CD

GitHub Actions 工作流（`.github/workflows/ci.yml`）在 push/PR 到 `master` 时自动运行：

1. **Rust** — 格式化检查 → clippy → 测试（每个 crate 独立运行）
2. **前端** — lint → 类型检查 → 构建
