const express = require("express");
const newsRoutes = require("./routes/newsRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const requestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");
const HttpError = require("./utils/httpError");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use(newsRoutes);
app.use(campaignRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use((req, _res, next) => {
  next(new HttpError(404, "NOT_FOUND", "リクエストされたAPIが見つかりません。"));
});

app.use(errorHandler);

module.exports = app;
