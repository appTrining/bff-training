const mockApiClient = require("../clients/mockApiClient");
const HttpError = require("../utils/httpError");

function buildErrorMessage(status) {
  if (status === 404) {
    return new HttpError(404, "NOT_FOUND", "対象のお知らせが見つかりません。");
  }

  return new HttpError(502, "MOCK_API_ERROR", "お知らせ情報の取得に失敗しました。");
}

async function fetchNewsList() {
  try {
    return await mockApiClient.get("/mock/news");
  } catch (error) {
    throw mapNewsError(error);
  }
}

async function fetchNewsDetail(id) {
  try {
    return await mockApiClient.get(`/mock/news/${id}`);
  } catch (error) {
    throw mapNewsError(error);
  }
}

function mapNewsError(error) {
  if (error instanceof HttpError) {
    if (error.code === "MOCK_API_UNAVAILABLE") {
      return error;
    }

    if (error.status === 404) {
      return buildErrorMessage(404);
    }

    if (error.status >= 500) {
      return buildErrorMessage(500);
    }

    return error;
  }

  return new HttpError(502, "MOCK_API_ERROR", "お知らせ情報の取得に失敗しました。");
}

module.exports = {
  fetchNewsList,
  fetchNewsDetail
};
