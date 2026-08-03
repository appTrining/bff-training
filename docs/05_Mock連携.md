# 05 Mock連携

## 接続先

- `GET /mock/news`
- `GET /mock/news/:id`
- `GET /mock/campaigns`
- `GET /mock/campaigns/:id`

## 変換しているもの

- IDのハイフンとアンダースコア
- 項目名
- エラー形式

## 連携時の考え方

- client は HTTP 通信だけを担当する
- repository は取得元を隠蔽する
- service と model で Flutter 向け返却を組み立てる
