# Introduction

Nebula is an EDA (Electronic Design Automation) platform for **micro/nano photonic device design and system design**, built with **React + Rust**.

## Core Architecture

Nebula consists of the following core components:

- **Rust Backend** — Template engine core (`nebula-core`), CLI tool (`nebula-cli`), and Axum HTTP server (`nebula-ffi`)
- **React Frontend** — Vite + TypeScript + MUI web interface for template selection and project scaffolding
- **Template System** — Tera template engine for rapid project initialization from templates
- **Simulation Integration** — gRPC integration with ANSYS Lumerical and Meep simulation engines

## Features

### Project Scaffolding

Quickly create new photonic design projects from templates. The built-in `pic-design` template supports:

- Template variable rendering (project name, author, PDK config, etc.)
- Path security validation (directory traversal prevention)
- Dry-run preview mode
- Three overwrite strategies (Fail / Overwrite / Skip)

### CLI Tool

```bash
# List available templates
cargo run -p nebula-cli -- template list

# Initialize a project from template
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject \\
  --author Alice \\
  --output /path/to/projects

# Preview mode (no files written)
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject --dry-run
```

### HTTP API Service

Axum-based REST API server on `127.0.0.1:3030` providing:

- Template list query
- Template metadata retrieval
- Project creation (camelCase JSON requests)

### Simulation Support

- **ANSYS Lumerical** — gRPC server integration via `grpcio`, wrapping `ansys/pylumerical`
- **Meep** — Open-source electromagnetic simulation support

## Tech Stack

| Area | Technology |
|------|------------|
| Backend | Rust 1.96, Axum, Tera, Clap |
| Frontend | React 19, TypeScript, Vite, MUI |
| Templates | Tera (Rust template engine) |
| Containers | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## Next Steps

- Read [Getting Started](/manual/start/getting-started) to install and run Nebula
- See [Development Guide](/develop/developmentguide) to contribute
- Check [Protocol Docs](/protocol/) for API reference
