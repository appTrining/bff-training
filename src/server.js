const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log(`BFF server started on http://localhost:${env.port}`);
  console.log(`Mock API base URL: ${env.mockApiBaseUrl}`);
});
