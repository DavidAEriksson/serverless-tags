import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
router.post("/hello", (req, res) => console.log(req.body));

api.use("/api/", router);

export const handler = serverless(api);
