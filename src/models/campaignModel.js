function toCampaignListItem(item) {
  return {
    id: item.id,
    title: item.title,
    startDate: item.start_at,
    endDate: item.end_at,
    thumbnailUrl: item.thumbnail_url,
    status: item.status
  };
}

function toCampaignDetail(item) {
  return {
    id: item.id,
    title: item.title,
    startDate: item.start_at,
    endDate: item.end_at,
    description: item.description,
    imageUrl: item.image_url,
    status: item.status
  };
}

module.exports = {
  toCampaignListItem,
  toCampaignDetail
};
