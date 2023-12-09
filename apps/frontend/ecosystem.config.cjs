module.exports = {
  apps: [
    {
      name: `markitos.es.frontend`,
      script: "serve",
      args: "--spa",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 5173,
        PM2_SERVE_SPA: "true",
        NODE_ENV: 'production',
      },
    },
  ],
};
