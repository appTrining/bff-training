const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
  port: Number(process.env.PORT || 3000),
  mockApiBaseUrl: process.env.MOCK_API_BASE_URL || "http://localhost:8080"
};
