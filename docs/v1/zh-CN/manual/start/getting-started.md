# 快速开始

## 环境要求

- **Rust** 1.95+
- **Node.js** 22+（前端开发）
- **pnpm**（前端包管理）
- **Docker**（可选，容器化部署）

## 方式一：Docker 部署（推荐）

使用 Docker Compose 一键启动前后端服务：

```bash
# 克隆仓库
git clone https://github.com/IGIPME/Nebula.git
cd Nebula

# 构建并启动
docker compose up -d

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f

# 停止服务
docker compose down
```

启动后访问：
- **前端界面**：`http://localhost:5173`
- **后端 API**：`http://localhost:3030`
- **健康检查**：`http://localhost:3030/health`

### 生产环境部署

生产部署使用预构建的腾讯云 TCR 镜像：

```bash
# 拉取镜像并启动
docker compose -f docker-compose.production.yml --env-file .env up -d
```

## 方式二：源码运行

### 启动后端

```bash
cd Nebula

# 构建 Rust 工作区
cargo build

# 启动 HTTP 服务器
cargo run -p nebula-ffi --bin nebula-server

# 或指定监听地址
NEBULA_SERVER_ADDR=0.0.0.0:3030 cargo run -p nebula-ffi --bin nebula-server
```

### 启动前端

```bash
cd Nebula/src/nebula

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

前端开发服务器默认运行在 `http://localhost:5173`，通过 Vite 代理自动将 `/api` 请求转发到后端。

## 方式三：CLI 命令行

如果只需要使用模板脚手架功能，可以直接使用 CLI：

```bash
cd Nebula

# 查看所有可用模板
cargo run -p nebula-cli -- template list

# 从 pic-design 模板创建项目
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject \\
  --author Alice \\
  --output ./my-projects

# 使用 --var 设置更多变量
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject \\
  --var pdk-name=SiPh_PDK \\
  --var project-version=0.2.0

# 预览模式（不实际创建文件）
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject --dry-run

# 强制覆盖已存在文件
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject --force
```

## 使用 Web 界面

1. 确保后端服务已启动（`http://localhost:3030`）
2. 打开前端界面（`http://localhost:5173`）
3. 选择一个模板（如 `pic-design`）
4. 填写模板变量（项目名、作者、PDK 等）
5. 选择输出目录和冲突处理策略
6. 点击「预览创建」进行 dry-run 预览，或关闭 dry-run 后点击「创建项目」

## 模板变量说明

当前 `pic-design` 模板支持以下变量：

| 变量 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `project-name` | 必填 | `NewProject` | 项目名称（也是输出目录名） |
| `project-version` | 可选 | `0.1.0` | 项目版本号 |
| `description` | 可选 | 一个 PIC 新项目 | 项目描述 |
| `author` | 可选 | `unknown` | 作者名 |
| `pdk-name` | 可选 | `SiPh_PDK` | PDK 名称 |
| `pdk-version` | 可选 | `1.0.0` | PDK 版本 |

> **注意**：变量名支持连字符（`project-name`）和下划线（`project_name`）两种写法，CLI 和 API 均会自动转换。

## 下一步

- 查阅 [开发指南](/develop/developmentguide) 参与项目开发
- 参考 [协议文档](/protocol/) 了解 API 详情
