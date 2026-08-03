# 04 API仕様

## Flutter → BFF

### `GET /news`

- お知らせ一覧

返却例:

```json
{
  "items": [
    {
      "id": "news_001",
      "title": "メンテナンスのお知らせ",
      "publishedDate": "2026-06-10T09:00:00+09:00",
      "isNew": true
    }
  ]
}
```

### `GET /news/:id`

- お知らせ詳細

返却例:

```json
{
  "id": "news_001",
  "title": "メンテナンスのお知らせ",
  "publishedDate": "2026-06-10T09:00:00+09:00",
  "isNew": true,
  "body": "2026年6月20日にシステムメンテナンスを実施します。"
}
```

### `GET /campaigns`

- キャンペーン一覧

返却例:

```json
{
  "items": [
    {
      "id": "campaign_001",
      "title": "夏のポイント増量キャンペーン",
      "startDate": "2026-06-01T00:00:00+09:00",
      "endDate": "2026-06-30T23:59:59+09:00",
      "thumbnailUrl": "https://example.com/campaign-001.png",
      "status": "active"
    }
  ]
}
```

### `GET /campaigns/:id`

- キャンペーン詳細

返却例:

```json
{
  "id": "campaign_001",
  "title": "夏のポイント増量キャンペーン",
  "startDate": "2026-06-01T00:00:00+09:00",
  "endDate": "2026-06-30T23:59:59+09:00",
  "description": "期間中はポイント付与率が2倍になります。",
  "imageUrl": "https://example.com/campaign-001-detail.png",
  "status": "active"
}
```

## エラー形式

```json
{
  "error": {
    "code": "MOCK_API_ERROR",
    "message": "お知らせ情報の取得に失敗しました。"
  }
}
```
