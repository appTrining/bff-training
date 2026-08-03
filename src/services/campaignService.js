const campaignRepository = require("../repositories/campaignRepository");
const campaignModel = require("../models/campaignModel");

async function getCampaignList() {
  const data = await campaignRepository.fetchCampaignList();

  return {
    items: Array.isArray(data.items)
      ? data.items.map(campaignModel.toCampaignListItem)
      : []
  };
}

async function getCampaignDetail(id) {
  const data = await campaignRepository.fetchCampaignDetail(id);
  return campaignModel.toCampaignDetail(data);
}

module.exports = {
  getCampaignList,
  getCampaignDetail
};
