# bff-training

Flutter クライアントと WireMock の間に入る BFF を、実務に近い責務分離で学ぶための研修用プロジェクト。`route / controller / service / repository / client / model / middleware` の役割が見える構成にしている。

## このリポジトリの役割

- Flutter 向けの API を `http://localhost:3000` で提供する
- WireMock の生データを Flutter 向けに整形する
- 外部依存を呼ぶ層と、公開 API の責務を分離する
- 研修で BFF の変更点を追いやすくする

## BFFの責務

- Flutter からの HTTP リクエストを受ける
- Mock API からデータを取得する
- Flutter 向けのレスポンス項目へ変換する
- 依存先未起動、404、500 などをアプリ向けエラーへ変換する

## 起動前提

- `mock-training` を先に起動する
- WireMock は `http://localhost:8080` で待ち受ける
- BFF は `http://localhost:3000` で待ち受ける

## 起動方法

### 1. 依存関係を入れる

```bash
npm install
```

### 2. 環境変数を設定する

`.env.example` を参考に `.env` を作る。

```bash
cp .env.example .env
```

### 3. 開発起動

```bash
npm run dev
```

### 4. 通常起動

```bash
npm start
```

## 環境変数

- `PORT=3000`
- `MOCK_API_BASE_URL=http://localhost:8080`

## WireMockとの接続関係

Flutter から BFF へ:

- `GET /news`
- `GET /news/:id`
- `GET /campaigns`
- `GET /campaigns/:id`

BFF から WireMock へ:

- `GET /mock/news`
- `GET /mock/news/:id`
- `GET /mock/campaigns`
- `GET /mock/campaigns/:id`

研修用に、Flutter 向けの ID は `news_001` / `campaign_001` のようなアンダースコア形式、Mock 側の ID は `news-001` / `campaign-001` のようなハイフン形式なので、BFF がその差分を吸収する。

## WireMock接続先の使い分け

この研修では、WireMock の確認方法が 2 種類ある。

### 1. JSON編集・Java起動で確認する場合

WireMock 本体を Java コマンドで起動する。

- WireMock: `http://localhost:8080`
- BFF の接続先: `http://localhost:8080`

`.env` の設定例:

```text
MOCK_API_BASE_URL=http://localhost:8080
```

この場合、`mappings / __files` の JSON を直接編集し、Java 起動の WireMock で確認する。

### 2. GUIで編集して確認する場合

GUI 付き WireMock を Docker で別ポートに起動する。

- GUI付きWireMock: `http://localhost:8081`
- GUI画面: `http://localhost:8081/__admin/webapp`
- BFF の接続先: `http://localhost:8081`

`.env` の設定例:

```text
MOCK_API_BASE_URL=http://localhost:8081
```

この場合、GUI で編集した内容を BFF 経由で確認できる。

### 注意点

Java 起動の WireMock `localhost:8080` と、GUI 付き WireMock `localhost:8081` は別プロセス。

そのため、GUI で編集した内容は、BFF が `localhost:8081` を参照している場合に反映される。

BFF が `localhost:8080` を参照している場合、GUI 側の変更は即時反映されない。

### 推奨

- JSON編集・Git差分確認を重視する場合: `MOCK_API_BASE_URL=http://localhost:8080`
- GUI操作を体験したい場合: `MOCK_API_BASE_URL=http://localhost:8081`

## API一覧

### `GET /news`

- お知らせ一覧を返す

### `GET /news/:id`

- お知らせ詳細を返す

### `GET /campaigns`

- キャンペーン一覧を返す

### `GET /campaigns/:id`

- キャンペーン詳細を返す

## ディレクトリ構成

```text
bff-training/
├ package.json
├ README.md
├ .env.example
├ src/
│  ├ app.js
│  ├ server.js
│  ├ config/
│  │  └ env.js
│  ├ routes/
│  │  ├ newsRoutes.js
│  │  └ campaignRoutes.js
│  ├ controllers/
│  │  ├ newsController.js
│  │  └ campaignController.js
│  ├ services/
│  │  ├ newsService.js
│  │  └ campaignService.js
│  ├ repositories/
│  │  ├ newsRepository.js
│  │  └ campaignRepository.js
│  ├ clients/
│  │  └ mockApiClient.js
│  ├ models/
│  │  ├ newsModel.js
│  │  └ campaignModel.js
│  ├ middlewares/
│  │  ├ errorHandler.js
│  │  └ requestLogger.js
│  └ utils/
│     └ httpError.js
└ docs/
```

## route / controller / service / repository / client の違い

### routes

- URL と controller を紐づける

### controllers

- HTTP リクエストを受ける
- service を呼び出してレスポンスを返す

### services

- 業務ロジックとレスポンス整形を組み立てる
- 一覧と詳細の返却内容を決める

### repositories

- データ取得元を隠蔽する
- 今回は Mock API を呼ぶ
- エラーをドメイン向けに変換する

### clients

- WireMock など外部 HTTP 通信を担当する

## 動作確認用curl

WireMock 起動後に以下で確認する。

```bash
curl http://localhost:3000/news
curl http://localhost:3000/news/news_001
curl http://localhost:3000/campaigns
curl http://localhost:3000/campaigns/campaign_001
```

## よくあるエラー

- `mock-training` を先に起動していない
- `MOCK_API_BASE_URL` が `http://localhost:8080` になっていない
- `news_001` と `news-001` の ID 変換前提を見落とす
- route に業務ロジックを書いてしまう
- Mock の生レスポンスをそのまま返してしまう

## Gitコミットメッセージ例

- `初期: BFF研修用プロジェクトを作成`
- `Step1: お知らせAPIのルーティングを追加`
- `Step2: WireMock連携用クライアントを追加`
- `Step3: お知らせレスポンス整形を追加`
- `Step4: キャンペーンAPIを追加`
- `Step5: エラーハンドリングを追加`

## docs

- [docs/01_BFF概要.md](docs/01_BFF概要.md)
- [docs/02_起動方法.md](docs/02_起動方法.md)
- [docs/03_ディレクトリ構成.md](docs/03_ディレクトリ構成.md)
- [docs/04_API仕様.md](docs/04_API仕様.md)
- [docs/05_Mock連携.md](docs/05_Mock連携.md)
- [docs/06_トラブルシュート.md](docs/06_トラブルシュート.md)
