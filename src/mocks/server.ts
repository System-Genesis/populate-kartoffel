import { Request, Response } from "express";
import { updatePersonsOnCommend } from "./mocksGenerator";
import { app } from "../express/server";
import { find } from "../util/repo/repository";
import { denormalizedEntityModel } from "../util/repo/models";

export default async () => {
  app.get("/updatePerson", async function (_: Request, res: Response) {
    const responseFromDB = await updatePersonsOnCommend();
    res.send(`${JSON.stringify(responseFromDB)}`);
  });

  app.get("/getAllPopulated", async function (_: Request, res: Response) {
    const responseFromDB = JSON.stringify(await find(denormalizedEntityModel,{}));
    res.send(`${responseFromDB}`);
  });
};
