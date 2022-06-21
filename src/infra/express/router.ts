import { Request,Response, Router } from "express";
import config from '../../config'
import regularChangeUpdate from "../../service/regularChangeUpdate";

const mongo = config.mongo

const appRouter = Router();

/**
 * recovery runs
 */
appRouter.post("/populateEntity", async function (req: Request, res: Response) {
  res.json(await regularChangeUpdate(req.body.id, mongo.entityCollectionName));
});

appRouter.post("/populateDI", async function (req: Request, res: Response) {
  res.json(await regularChangeUpdate(req.body.id, mongo.digitalIdentityCollectionName));
});

appRouter.post("/populateRole", async function (req: Request, res: Response) {
  res.json(await regularChangeUpdate(req.body.id, mongo.roleCollectionName));
});

appRouter.post("/populateGroup", async function (req: Request, res: Response) {
  res.json(await regularChangeUpdate(req.body.id, mongo.organizationGroupCollectionName));
});

export default appRouter;
