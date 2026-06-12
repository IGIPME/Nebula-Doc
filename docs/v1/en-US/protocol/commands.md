# API Endpoint Reference

## GET /health

Health check endpoint.

### Request

```
GET /health
```

### Response

```json
{
  "status": "ok"
}
```

---

## GET /api/templates

Get a summary list of all available templates.

### Response

```json
{
  "templates": [
    {
      "name": "pic-design",
      "description": "A basic Nebula project template",
      "version": "1.0"
    }
  ]
}
```

---

## GET /api/templates/\\{templateName\\}

Get full metadata for a specific template, including variable definitions.

### Response

```json
{
  "template": {
    "name": "pic-design",
    "description": "A basic Nebula project template",
    "version": "1.0"
  },
  "variables": {
    "project-name": {
      "prompt": "Project name",
      "default": "NewProject",
      "required": false
    }
  }
}
```

---

## POST /api/projects

Create a new project from a template.

### Request

```
POST /api/projects
Content-Type: application/json
```

```json
{
  "templateName": "pic-design",
  "outputBase": "/home/alice/projects",
  "variables": {
    "project-name": "MyProject",
    "author": "Alice"
  },
  "overwrite": "fail",
  "dryRun": false
}
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `templateName` | string | Yes | - | Template name |
| `outputBase` | string | Yes | - | Output parent directory (absolute path) |
| `variables` | object | No | `{}` | Template variable key-value pairs |
| `overwrite` | string | No | `"fail"` | Conflict strategy: `fail`, `overwrite`, `skip` |
| `dryRun` | boolean | No | `false` | Preview only, no files written |

### Overwrite Strategies

| Value | Description |
|-------|-------------|
| `fail` | Error on existing files (default) |
| `skip` | Skip existing files |
| `overwrite` | Overwrite existing files |

### Response (Live Creation)

**Status**: `201 Created`

```json
{
  "createdDirs": ["/home/alice/projects/MyProject"],
  "createdFiles": [
    "/home/alice/projects/MyProject/README.md",
    "/home/alice/projects/MyProject/project.toml",
    "/home/alice/projects/MyProject/project.pic.toml"
  ],
  "skippedFiles": [],
  "dryRun": false
}
```

### Response (Dry-run)

**Status**: `200 OK`

```json
{
  "createdDirs": ["/home/alice/projects/MyProject"],
  "createdFiles": [
    "/home/alice/projects/MyProject/README.md",
    "/home/alice/projects/MyProject/project.toml"
  ],
  "skippedFiles": [],
  "dryRun": true
}
```
