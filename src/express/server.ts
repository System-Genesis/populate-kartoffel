import express, { Request, Response } from "express";
import config from "../config";
import { getAllEvents } from "../util/repo/repository";

export const app = express();

export default async() => {
  app.get("/getAllEvents", async function (_: Request, res: Response) {
    let responseFromDB = await getAllEvents();
    res.send(`${responseFromDB}`);
  });

  app.listen(config.port);
}
