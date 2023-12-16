module.exports = {
  apps: [
    {
      name: "culturadevop.api",
      script: "dist/start.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
