const env = require("../config/env");
const HttpError = require("../utils/httpError");

async function get(pathname) {
  const url = new URL(pathname, env.mockApiBaseUrl).toString();

  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
  } catch (_error) {
    throw new HttpError(
      502,
      "MOCK_API_UNAVAILABLE",
      "Mock APIに接続できません。mock-training が起動しているか確認してください。"
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      isJson && payload && payload.message
        ? payload.message
        : "Mock APIからエラーが返されました。";

    throw new HttpError(response.status, "MOCK_API_ERROR", message, {
      responseBody: payload
    });
  }

  return payload;
}

module.exports = {
  get
};
