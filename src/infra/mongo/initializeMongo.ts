import mongoose from "mongoose";
import config from "../../config";

export const initializeMongo = async () => {
  console.log("Connecting to Mongo...");
  await mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  // TODO-ELI: 'await' has no effect on the type of this expression
  await mongoose.connection.on("reconnected", function () {
    console.info("Reconnected to MongoDB");
  });

  // TODO-ELI: 'await' has no effect on the type of this expression
  await mongoose.connection.on("disconnected", () =>
    console.info("MongoDB disconnected")
  );
  console.log("Mongo connection established");
};
