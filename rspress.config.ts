import * as path from 'node:path';
import { withZephyr } from "zephyr-rspress-plugin";
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Nebula | Nebula 文档站',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rspress',
      },
    ],
  },
  plugins: [withZephyr()],
  locales: [
    {
      lang: 'zh-CN',
      label: '简体中文',
      title: 'Nebula | Nebula 文档站',
      description: 'Nebula | JaliumUI + Rust，提供微纳米光子器件设计与系统设计解决方案',
    },
    {
      lang: 'en-US',
      label: 'English',
      title: 'Nebula | Nebula Documentation Site',
      description: 'Nebula | JaliumUI + Rust, providing micro-nano photonic device design and system design solutions',
    },
  ],
  lang: 'zh-CN',
  multiVersion: {
    default: 'v1',
    versions: ['v1'],
  },
});
