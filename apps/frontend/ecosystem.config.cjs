module.exports = {
  apps: [
    {
      name: `culturadevop.frontend`,
      script: "serve",
      args: "--spa",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 5173,
        PM2_SERVE_SPA: "true",
        NODE_ENV: 'production',
        VITE_API_ENDPOINT: 'http://culturadevop.com:3000/api/v1'
      },
      env_production: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 5173,
        PM2_SERVE_SPA: "true",
        NODE_ENV: 'production',
        VITE_API_ENDPOINT: 'http://culturadevop.com:3000/api/v1'
      },
    },
  ],
};
