import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import config from "../../config";
import regularChangeUpdate from "../../service/regularChangeUpdate";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * recovery runs 
 */
export default async () => {
  app.post("/populateEntity", async function (req: Request, res: Response) {
    if (authCheck(req.headers.authorization)) {
      await regularChangeUpdate(req.body.id, config.mongo.entityCollectionName)
      res.status(200)
      res.send(`the object with the id '${req.body.id}' has updated`);
    } else {
      res.status(401);
      res.send(`request unauthorized`);
    }
  });

  app.post("/populateDI", async function (req: Request, res: Response) {
    if (authCheck(req.headers.authorization)) {
      await regularChangeUpdate(req.body.id, config.mongo.digitalIdentityCollectionName)
      res.status(200)
      res.send(`the object with the id '${req.body.id}' has updated`);
    } else {
      res.status(401);
      res.send(`request unauthorized`);
    }
  });

  app.post("/populateRole", async function (req: Request, res: Response) {
    if (authCheck(req.headers.authorization)) {
      await regularChangeUpdate(req.body.id, config.mongo.roleCollectionName)
      res.status(200)
      res.send(`the object with the id '${req.body.id}' has updated`);
    } else {
      res.status(401);
      res.send(`request unauthorized`);
    }
  });

  app.post("/populateGroup", async function (req: Request, res: Response) {
    if (authCheck(req.headers.authorization)) {
      await regularChangeUpdate(req.body.id, config.mongo.organizationGroupCollectionName)
      res.status(200)
      res.send(`the object with the id '${req.body.id}' has updated`);
    } else {
      res.status(401);
      res.send(`request unauthorized`);
    }
  });

  app.listen(config.port , () => console.log("server runs on port:" + config.port));
};

const authCheck = (authString) => {
  return authString === config.apiPassword;
};
