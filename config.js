var config = {
    production: {
        port: 80
    },
    default: {
        port: 8080
    }
  }
  
  exports.get = function get(env) {
    return config[env] || config.default;
  }