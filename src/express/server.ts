import express, { Request, Response } from "express";
import config from "../config";

export const app = express();

export default async() => {
  app.get("/", async function (_: Request, res: Response) {
    res.send(``);
  });

  app.listen(config.port);
}
