import cors from "cors";
import "dotenv/config";
import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/error.js";
import { apiRouter } from "./routes.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:3000";

app.use(
  cors({
    origin: webOrigin.split(",").map((o) => o.trim()),
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ name: "aitree-api", status: "ok" });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});
