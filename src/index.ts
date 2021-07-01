import config from "./config/index";
import server from "./express/server";
import buildMocks from "./mocks/index";
import { initializeMongo } from "./util/mongo/initializeMongo";
// import { initializeMongo } from "./util/mongo/initializeMongo";
import { initializeRabbit } from "./util/rabbit/initializeRabbit";

const main = async () => {
  await initializeMongo();
  
  await initializeRabbit();

  await server();

  //start dev environment
  if (config.isMock) await buildMocks();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
