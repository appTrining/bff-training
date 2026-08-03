const campaignService = require("../services/campaignService");

async function getCampaignList(_req, res, next) {
  try {
    const response = await campaignService.getCampaignList();
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getCampaignDetail(req, res, next) {
  try {
    const response = await campaignService.getCampaignDetail(req.params.id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCampaignList,
  getCampaignDetail
};
