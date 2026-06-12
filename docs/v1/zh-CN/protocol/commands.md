# API 端点参考

## GET /health

健康检查接口。

### 请求

```
GET /health
```

### 响应

```json
{
  "status": "ok"
}
```

---

## GET /api/templates

获取所有可用模板的摘要列表。

### 请求

```
GET /api/templates
```

### 响应

```json
{
  "templates": [
    {
      "name": "pic-design",
      "description": "一个基础的 Nebula 项目模板",
      "version": "1.0"
    }
  ]
}
```

---

## GET /api/templates/\\{templateName\\}

获取指定模板的完整元数据，包括变量定义。

### 请求

```
GET /api/templates/pic-design
```

### 响应

```json
{
  "template": {
    "name": "pic-design",
    "description": "一个基础的 Nebula 项目模板",
    "version": "1.0"
  },
  "variables": {
    "project-name": {
      "prompt": "项目名称",
      "default": "NewProject",
      "required": false
    },
    "author": {
      "prompt": "作者",
      "default": "unknown",
      "required": false
    },
    "pdk-name": {
      "prompt": "PDK 名称",
      "default": "SiPh_PDK",
      "required": false
    }
  }
}
```

### 变量字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `prompt` | string? | 变量的中文提示/标签 |
| `default` | string? | 默认值 |
| `required` | boolean | 是否必填（无默认值或默认值为空时标记为必填） |

---

## POST /api/projects

创建新项目，从模板脚手架生成项目文件。

### 请求

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
    "author": "Alice",
    "pdk-name": "SiPh_PDK",
    "description": "我的 PIC 项目",
    "project-version": "0.1.0",
    "pdk-version": "1.0.0"
  },
  "overwrite": "fail",
  "dryRun": false
}
```

### 请求参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| `templateName` | string | 是 | - | 模板名称 |
| `outputBase` | string | 是 | - | 项目输出父目录（绝对路径） |
| `variables` | object | 否 | `{}` | 模板变量键值对 |
| `overwrite` | string | 否 | `"fail"` | 冲突策略：`fail`、`overwrite`、`skip` |
| `dryRun` | boolean | 否 | `false` | 仅预览不写入 |

### 冲突策略

| 值 | 说明 |
|------|------|
| `fail` | 遇到已存在文件时报错（默认） |
| `skip` | 跳过已存在的文件 |
| `overwrite` | 覆盖已存在的文件 |

### 响应（正式创建）

**状态码**：`201 Created`

```json
{
  "createdDirs": [
    "/home/alice/projects/MyProject"
  ],
  "createdFiles": [
    "/home/alice/projects/MyProject/README.md",
    "/home/alice/projects/MyProject/project.toml",
    "/home/alice/projects/MyProject/project.pic.toml"
  ],
  "skippedFiles": [],
  "dryRun": false
}
```

### 响应（dry-run 预览）

**状态码**：`200 OK`

```json
{
  "createdDirs": [
    "/home/alice/projects/MyProject"
  ],
  "createdFiles": [
    "/home/alice/projects/MyProject/README.md",
    "/home/alice/projects/MyProject/project.toml",
    "/home/alice/projects/MyProject/project.pic.toml"
  ],
  "skippedFiles": [],
  "dryRun": true
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `createdDirs` | string[] | 创建的目录列表 |
| `createdFiles` | string[] | 创建的文件列表（含绝对路径） |
| `skippedFiles` | string[] | 跳过的文件列表（仅 `skip` 策略） |
| `dryRun` | boolean | 是否为预览模式 |

### 错误示例

**模板不存在**（404）：
```json
{
  "error": {
    "code": "template_not_found",
    "message": "模板 'unknown-template' 不存在"
  }
}
```

**文件冲突**（409）：
```json
{
  "error": {
    "code": "project_conflict",
    "message": "目标文件已存在：/home/alice/projects/MyProject/README.md。如需覆盖，请使用 --force"
  }
}
```

**参数无效**（400）：
```json
{
  "error": {
    "code": "invalid_request",
    "message": "变量 'project-name' 不能包含路径分隔符或特殊目录名"
  }
}
```
