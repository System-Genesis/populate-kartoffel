import mongoose from "mongoose";
import config from "./config/index";
import server from "./express/server";
import menash from "menashmq";

// import buildMocks from "./mocks/index";

const { mongo, rabbit } = config;

const initializeMongo = async () => {
  console.log("Connecting to Mongo...");

  await mongoose.connect(mongo.uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log("Mongo connection established");
};

const initializeRabbit = async () => {
  await menash.connect(rabbit.uri);
  await menash.declareQueue(rabbit.queueName, { durable: true });

  console.log("Rabbit connected");
};

const initiateChangeStraem = async () => {

};

const main = async () => {
  await initializeMongo();

  await initializeRabbit();

  await initiateChangeStraem();

  await server();

  //start dev environment
  // if (config.isMock) await buildMocks()

};

main().catch((err) => console.error(err));
