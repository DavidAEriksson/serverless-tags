import express, { Router } from "express";
import serverless from "serverless-http";

const port = process.env.PORT || 3000;
const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.post("/hello", (req, res) => console.log(req.body));

api.use("/api/", router);

export const handler = serverless(api);

api.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
