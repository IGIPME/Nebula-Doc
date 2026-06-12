---
pageType: home

hero:
  name: Nebula Docs
  text: 微纳米光子器件设计 EDA 平台
  tagline: React + Rust，提供微纳米光子器件设计与系统设计解决方案
  actions:
    - theme: brand
      text: 新手上路
      link: /manual/start/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/IGIPME/Nebula
  image:
    src: /rspress-icon.png
    alt: Nebula Logo
features:
  - title: 项目脚手架
    details: 基于 Tera 模板引擎，支持从模板快速初始化光子设计项目，自动渲染变量并生成项目结构。
    icon: 🚀
    link: /manual/start/getting-started
  - title: CLI 命令行
    details: 提供完整的命令行界面，支持模板列表、项目初始化、变量交互式填充，可集成到自动化脚本中。
    icon: ⌨️
    link: /manual/start/getting-started
  - title: REST API 服务
    details: 基于 Axum 提供 HTTP API，可通过 REST 接口远程创建和管理项目，方便集成到 CI/CD 流程。
    icon: 🔌
    link: /protocol/
  - title: 仿真集成
    details: 支持 ANSYS Lumerical、Meep 仿真引擎，通过 gRPC 服务器进行仿真集成。
    icon: 🔬
    link: /manual/start/getting-started
  - title: 多语言支持
    details: 支持 Python、Rust 等多种接口，以中文（简体）为第一语言，方便自动化集成。
    icon: 🌐
    link: /develop/developmentguide
  - title: Docker 部署
    details: 提供开发与生产环境的 Docker Compose 配置，一键启动前后端服务。
    icon: 🐳
    link: /manual/start/getting-started
---
