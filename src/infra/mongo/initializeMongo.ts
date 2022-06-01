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

  mongoose.connection.on("reconnected", function () {
    console.info("Reconnected to MongoDB");
  });

  mongoose.connection.on("disconnected", () =>
    console.info("MongoDB disconnected")
  );
  console.log("Mongo connection established");
};
