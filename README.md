# 5plus1 Server Homepage

一个完全静态的 Vite + React 网站。生产环境不需要 Node.js、Worker、数据库或后端服务。

## 环境要求

- Node.js `>=20.19.0`
- npm

## 本地开发

```bash
npm install
npm run dev
```

## 构建纯静态目录

```bash
npm ci
npm run build
```

构建结果位于 `dist/`。将该目录内的全部文件上传到 Nginx、宝塔、对象存储或任意静态网站服务即可。

## 内容维护

- 页面组件：`src/App.tsx`
- 页面样式：`src/globals.css`
- 入服教程：`content/guide.md`
- 服务器公约：`content/covenant.md`
- 服务器地址、皮肤站与整合包 CDN 地址：`site.config.ts`
- 服务器状态查询：`src/ServerStatus.tsx`

修改后重新运行 `npm run build` 即可。

## Nginx 示例

```nginx
server {
    listen 80;
    server_name mc.five-plus-one.com;

    root /var/www/mc.five-plus-one.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```
