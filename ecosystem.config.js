module.exports = {
  apps: [{
    name: "ptfrm_nueva_eps",
    script: "./server.js",
    env: {
      NODE_ENV: "development",
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_production: {
      NODE_ENV: "production",
    }
  },
  {
    name: "ptfrm_nueva_eps_api",
    script: "./server_public.js",
    env: {
      NODE_ENV: "development",
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_production: {
      NODE_ENV: "production",
    }
  },
  {
    name: "ptfrm_nueva_eps_tareas",
    script: "./server_tareas.js",
    env: {
      NODE_ENV: "development",
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}