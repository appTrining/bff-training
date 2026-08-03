const newsRepository = require("../repositories/newsRepository");
const newsModel = require("../models/newsModel");

async function getNewsList() {
  const data = await newsRepository.fetchNewsList();

  return {
    items: Array.isArray(data.items) ? data.items.map(newsModel.toNewsListItem) : []
  };
}

async function getNewsDetail(id) {
  const data = await newsRepository.fetchNewsDetail(id);
  return newsModel.toNewsDetail(data);
}

module.exports = {
  getNewsList,
  getNewsDetail
};
