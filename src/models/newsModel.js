function toNewsListItem(item) {
  return {
    id: item.id,
    title: item.title,
    publishedDate: item.published_at,
    isNew: item.read_flag === false
  };
}

function toNewsDetail(item) {
  return {
    id: item.id,
    title: item.title,
    publishedDate: item.published_at,
    isNew: item.important_flag === true,
    body: item.body
  };
}

module.exports = {
  toNewsListItem,
  toNewsDetail
};
