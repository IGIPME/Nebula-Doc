# Getting Started

## Prerequisites

- **Rust** 1.95+
- **Node.js** 22+ (frontend development)
- **pnpm** (frontend package manager)
- **Docker** (optional, for containerized deployment)

## Option 1: Docker (Recommended)

Start both frontend and backend with Docker Compose:

```bash
# Clone the repository
git clone https://github.com/IGIPME/Nebula.git
cd Nebula

# Build and start
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop services
docker compose down
```

After startup:
- **Frontend UI**: `http://localhost:5173`
- **Backend API**: `http://localhost:3030`
- **Health check**: `http://localhost:3030/health`

### Production Deployment

Production deployment uses pre-built Tencent Cloud TCR images:

```bash
docker compose -f docker-compose.production.yml --env-file .env up -d
```

## Option 2: Build from Source

### Start Backend

```bash
cd Nebula

# Build the Rust workspace
cargo build

# Start HTTP server
cargo run -p nebula-ffi --bin nebula-server

# Or specify listen address
NEBULA_SERVER_ADDR=0.0.0.0:3030 cargo run -p nebula-ffi --bin nebula-server
```

### Start Frontend

```bash
cd Nebula/src/nebula

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

The frontend dev server runs at `http://localhost:5173` and proxies `/api` requests to the backend via Vite.

## Option 3: CLI Only

Use the CLI directly for template scaffolding:

```bash
cd Nebula

# List all available templates
cargo run -p nebula-cli -- template list

# Create a project from the pic-design template
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject \\
  --author Alice \\
  --output ./my-projects

# Set additional variables with --var
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject \\
  --var pdk-name=SiPh_PDK \\
  --var project-version=0.2.0

# Preview only (dry-run)
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject --dry-run

# Force overwrite existing files
cargo run -p nebula-cli -- template init pic-design \\
  --name MyProject --force
```

## Using the Web Interface

1. Ensure the backend is running (`http://localhost:3030`)
2. Open the frontend (`http://localhost:5173`)
3. Select a template (e.g., `pic-design`)
4. Fill in template variables (project name, author, PDK, etc.)
5. Choose output directory and conflict strategy
6. Click "Preview" for dry-run, or disable dry-run and click "Create Project"

## Template Variables

The `pic-design` template supports the following variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `project-name` | Yes | `NewProject` | Project name (also the output directory name) |
| `project-version` | No | `0.1.0` | Project version |
| `description` | No | A new PIC project | Project description |
| `author` | No | `unknown` | Author name |
| `pdk-name` | No | `SiPh_PDK` | PDK name |
| `pdk-version` | No | `1.0.0` | PDK version |

> **Note**: Variable names support both hyphen (`project-name`) and underscore (`project_name`) forms. The CLI and API automatically normalize between them.

## Next Steps

- See [Development Guide](/develop/developmentguide) to contribute
- Check [Protocol Docs](/protocol/) for API reference
