const HttpError = require("../utils/httpError");

function errorHandler(error, _req, res, _next) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      error: {
        code: error.code,
        message: error.message
      }
    });
  }

  console.error("Unexpected error:", error);

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "不明なエラーが発生しました。"
    }
  });
}

module.exports = errorHandler;
