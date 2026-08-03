const newsService = require("../services/newsService");

async function getNewsList(_req, res, next) {
  try {
    const response = await newsService.getNewsList();
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getNewsDetail(req, res, next) {
  try {
    const response = await newsService.getNewsDetail(req.params.id);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNewsList,
  getNewsDetail
};
