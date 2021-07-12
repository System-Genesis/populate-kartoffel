import express, { Request, Response } from "express";
import { updateDIOnCommend, updatePersonsOnCommend } from "./mocksGenerator";
import { find } from "../util/repo/repository";
import { denormalizedEntityModel } from "../util/repo/models";
import config from "../config";

export const app = express();

export default async () => {
  app.get("/updatePerson", async function (req: Request, res: Response) {
    const entityId = req.query.entityId ? req.query.entityId : null;
    if (!entityId) res.send('you should enter an: "?entityId=somevalue"');
    else {
      const responseFromDB = await updatePersonsOnCommend(entityId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/updateDI", async function (req : Request, res: Response) {
    const sourceEntityId = req.query.sourceEntityId ? req.query.sourceEntityId : null;
    const destEntityId = req.query.destEntityId ? req.query.destEntityId : null;
    if (!sourceEntityId || !destEntityId) res.send('you should enter an: "?sourceEntityId=someValue&destEntityId=someOtherValue"');
    else {
      const responseFromDB = await updateDIOnCommend(sourceEntityId, destEntityId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/getAllPopulated", async function (_: Request, res: Response) {
    const responseFromDB = JSON.stringify(
      await find(denormalizedEntityModel, {})
    );
    res.send(`${responseFromDB}`);
  });

  app.listen(config.port);
};
