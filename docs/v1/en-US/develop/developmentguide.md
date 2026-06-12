# Development Guide

This document is for Nebula project developers, covering project structure, build process, and contribution guidelines.

## Project Structure

```
Nebula/
├── src/
│   ├── crates/              # Rust workspace
│   │   ├── core/            # nebula-core: template engine
│   │   │   ├── src/
│   │   │   │   ├── lib.rs           # Entry point
│   │   │   │   └── template/
│   │   │   │       ├── mod.rs       # Public API
│   │   │   │       └── engine.rs    # Template engine impl
│   │   │   └── Cargo.toml
│   │   ├── cli/             # nebula-cli: CLI tool
│   │   │   ├── src/
│   │   │   │   ├── main.rs          # Entry point
│   │   │   │   └── lib.rs           # CLI logic
│   │   │   └── Cargo.toml
│   │   └── ffi/             # nebula-ffi: Axum HTTP server
│   │       ├── src/
│   │       │   ├── main.rs          # Server entry
│   │       │   └── lib.rs           # Routes and handlers
│   │       └── Cargo.toml
│   ├── nebula/              # React frontend
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── api/                 # API client
│   │   │   └── components/          # UI components
│   │   └── package.json
│   └── python/lummcp/       # Python package (placeholder)
├── templates/               # Project templates
│   └── pic-design/
└── Cargo.toml               # Rust workspace config
```

## Workspace Architecture

| Crate | Package | Purpose |
|-------|---------|---------|
| `src/crates/core` | `nebula-core` | Core template engine: loading, rendering, path validation, project init |
| `src/crates/cli` | `nebula-cli` | Clap-based CLI wrapping `nebula-core` |
| `src/crates/ffi` | `nebula-ffi` | Axum HTTP server exposing `nebula-core` via REST API |

### Dependencies

```
nebula-cli  ──→  nebula-core
nebula-ffi  ──→  nebula-core
```

## Build & Test

### Rust Workspace

```bash
# Build all crates
cargo build

# Run all tests
cargo test

# Run tests for a specific crate
cargo test -p nebula-core
cargo test -p nebula-cli
cargo test -p nebula-ffi

# Format code
cargo fmt --all

# Clippy checks
cargo clippy --workspace --all-targets --all-features
```

### Frontend

```bash
cd src/nebula
pnpm install
pnpm dev      # Dev server
pnpm build    # Production build
pnpm lint     # Lint check
```

## Template System

### Adding a New Template

1. Create a new directory under `templates/`
2. Write `template.toml` metadata
3. Create template files with `{{ variable }}` placeholders
4. **Important**: Templates are embedded at compile time — rebuild after changes

### Variable Conventions

- Variable names support both hyphens (`-`) and underscores (`_`)
- System auto-creates aliases for both forms
- Path-like variables (`project-name`, `*-name`, `*_name`) reject `/`, `\\`, `.`, `..`

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR to `master`:

1. **Rust** — fmt → clippy → test (per crate)
2. **Frontend** — lint → type check → build
