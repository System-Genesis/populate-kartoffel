import express from "express";
import config from "../../config";
import { errorMiddleware } from "./error";
import appRouter from "./router";
import helmet from 'helmet';
import { wrapMiddleware } from "./wrappers";
import { authCheck } from "./authCheck";
import mockRouter from "../../mocks/server";

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', wrapMiddleware(authCheck) ,appRouter);
if(config.isMock) app.use(mockRouter);
app.use(errorMiddleware);

export default async () => {
  app.listen(config.port, () =>
    console.log("server runs on port:" + config.port)
  );
};


