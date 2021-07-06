import menash from "menashmq";
import config from "../../config/index";

export const initializeRabbit = async () => {
  await menash.connect(config.rabbit.uri);
  await menash.declareQueue(config.rabbit.queueName, { durable: true, autoDelete: false, });

  console.log("Rabbit connected");
};
