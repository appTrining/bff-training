const mockApiClient = require("../clients/mockApiClient");
const HttpError = require("../utils/httpError");

function buildErrorMessage(status) {
  if (status === 404) {
    return new HttpError(404, "NOT_FOUND", "対象のキャンペーンが見つかりません。");
  }

  return new HttpError(502, "MOCK_API_ERROR", "キャンペーン情報の取得に失敗しました。");
}

async function fetchCampaignList() {
  try {
    return await mockApiClient.get("/mock/campaigns");
  } catch (error) {
    throw mapCampaignError(error);
  }
}

async function fetchCampaignDetail(id) {
  try {
    return await mockApiClient.get(`/mock/campaigns/${id}`);
  } catch (error) {
    throw mapCampaignError(error);
  }
}

function mapCampaignError(error) {
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

  return new HttpError(502, "MOCK_API_ERROR", "キャンペーン情報の取得に失敗しました。");
}

module.exports = {
  fetchCampaignList,
  fetchCampaignDetail
};
