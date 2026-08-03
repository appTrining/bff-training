const express = require("express");
const campaignController = require("../controllers/campaignController");

const router = express.Router();

router.get("/campaigns", campaignController.getCampaignList);
router.get("/campaigns/:id", campaignController.getCampaignDetail);

module.exports = router;
