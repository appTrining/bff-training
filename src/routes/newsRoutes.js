const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

router.get("/news", newsController.getNewsList);
router.get("/news/:id", newsController.getNewsDetail);

module.exports = router;
