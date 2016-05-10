SystemJS.config({
  baseURL: ".",
  production: true,
  paths: {
    "github:*": "jspm_packages/github/*",
    "local:*": "jspm_packages/local/*",
    "npm:*": "jspm_packages/npm/*"
  }
});
