import { Router } from "express";
import runPopulateOnObject  from "./controllers/runPopulateOnObject";
// import recoveryRouter from "./routers/router.recovery";
import { wrapController } from "./wrappers";

const appRouter = Router();

//appRouter.use("/recovery", recoveryRouter)

appRouter.post("/populate/:type", wrapController(runPopulateOnObject));

export default appRouter;
