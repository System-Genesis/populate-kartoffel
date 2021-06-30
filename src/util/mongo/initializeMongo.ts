import mongoose from "mongoose";
import config from "../../config";
import { reinitializeOnError } from "../reinitializeOnError";

export const initializeMongo = async () => {
  console.log("Connecting to Mongo...");

  await mongoose
    .connect(config.mongo.uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        mongoose.connection.on("disconnected", () => reinitializeOnError(initializeMongo));
        console.log("Mongo connection established");
      },
      (err) => {
        console.log(err)
        reinitializeOnError(initializeMongo);
      }
    );
};
