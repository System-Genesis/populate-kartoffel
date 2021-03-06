import { Request, Response } from "express";
import { changeOGDirectGroup, changeRoleDirectGroup, connectDIOnCommand, connectRoleOnCommand, disconnectDIOnCommand, disconnectRoleOnCommand, updatePersonsOnCommand } from "./mocksGenerator";
import { find } from "../infra/repo/repository";
import { denormalizedEntityModel } from "../infra/repo/models";
import { app } from "../infra/express/server"

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
      const responseFromDB = await updatePersonsOnCommand(entityId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/disconnectDIOnCommand", async function (req : Request, res: Response) {
    const DIId = req.query.DIId ? req.query.DIId : null;
    if (!DIId ) res.send('you should enter an: "?DIId=someValue"');
    else {
      const responseFromDB = await disconnectDIOnCommand(DIId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/connectDIOnCommand", async function (req : Request, res: Response) {
    const DIId = req.query.DIId ? req.query.DIId : null;
    const destEntityId = req.query.destEntityId ? req.query.destEntityId : null;
    if (!DIId || !destEntityId) res.send('you should enter an: "?DIId=someValue&destEntityId=someOtherValue"');
    else {
      const responseFromDB = await connectDIOnCommand(DIId, destEntityId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/disconnectRoleOnCommand", async function (req : Request, res: Response) {
    const roleId = req.query.roleId ? req.query.roleId : null;
    if (!roleId ) res.send('you should enter an: "?roleId=someValue"');
    else {
      const responseFromDB = await disconnectRoleOnCommand(roleId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });

  app.get("/connectRoleOnCommand", async function (req : Request, res: Response) {
    const roleId = req.query.roleId ? req.query.roleId : null;
    const destDIId = req.query.destDIId ? req.query.destDIId : null;
    if (!roleId || !destDIId) res.send('you should enter an: "?roleId=someValue&destDIId=someOtherValue"');
    else {
      const responseFromDB = await connectRoleOnCommand(roleId, destDIId);
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

  app.get("/changeOGDirectGroup", async function (req : Request, res: Response) {
    const OGId = req.query.OGId ? req.query.OGId : null;
    const directGroupId = req.query.directGroupId ? req.query.directGroupId : null;
    if (!OGId || !directGroupId) res.send('you should enter an: "?OGId=someValue&directGroupId=someOtherValue"');
    else {
      const responseFromDB = await changeOGDirectGroup(OGId, directGroupId);
      res.send(`${JSON.stringify(responseFromDB)}`);
    }
  });
};
