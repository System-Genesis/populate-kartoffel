import express, { Request, Response } from "express";
import { changeRoleDirectGroup, connectDIOnCommend, connectRoleOnCommend, disconnectDIOnCommend, disconnectRoleOnCommend, updatePersonsOnCommend } from "./mocksGenerator";
import { find } from "../util/repo/repository";
import { denormalizedEntityModel } from "../util/repo/models";
import config from "../config";

export const app = express();

export default async () => {
  app.get("/getAllPopulatedEntities", async function (_: Request, res: Response) {
    const responseFromDB = JSON.stringify(
      await find(denormalizedEntityModel, {})
    );
    res.send(`${responseFromDB}`);
  });

  app.get("/updatePerson", async function (req: Request, res: Response) {
    const entityId = req.query.entityId ? req.query.entityId : null;
    if (!entityId) res.send('you should enter an: "?entityId=somevalue"');
    else {
      const responseFromDB = await updatePersonsOnCommend(entityId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/disconnectDIOnCommend", async function (req : Request, res: Response) {
    const DIId = req.query.DIId ? req.query.DIId : null;
    if (!DIId ) res.send('you should enter an: "?DIId=someValue"');
    else {
      const responseFromDB = await disconnectDIOnCommend(DIId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/connectDIOnCommend", async function (req : Request, res: Response) {
    const DIId = req.query.DIId ? req.query.DIId : null;
    const destEntityId = req.query.destEntityId ? req.query.destEntityId : null;
    if (!DIId || !destEntityId) res.send('you should enter an: "?DIId=someValue&destEntityId=someOtherValue"');
    else {
      const responseFromDB = await connectDIOnCommend(DIId, destEntityId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/disconnectRoleOnCommend", async function (req : Request, res: Response) {
    const roleId = req.query.roleId ? req.query.roleId : null;
    if (!roleId ) res.send('you should enter an: "?roleId=someValue"');
    else {
      const responseFromDB = await disconnectRoleOnCommend(roleId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/connectRoleOnCommend", async function (req : Request, res: Response) {
    const roleId = req.query.roleId ? req.query.roleId : null;
    const destDIId = req.query.destDIId ? req.query.destDIId : null;
    if (!roleId || !destDIId) res.send('you should enter an: "?roleId=someValue&destDIId=someOtherValue"');
    else {
      const responseFromDB = await connectRoleOnCommend(roleId, destDIId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/changeRoleDirectGroup", async function (req : Request, res: Response) {
    const roleId = req.query.roleId ? req.query.roleId : null;
    const destOGId = req.query.destOGId ? req.query.destOGId : null;
    if (!roleId || !destOGId) res.send('you should enter an: "?roleId=someValue&destOGId=someOtherValue"');
    else {
      const responseFromDB = await changeRoleDirectGroup(roleId, destOGId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.listen(config.port);
};
