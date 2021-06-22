import menash from "menashmq";
import config from "../../config/index";
import { rabbitConsumer } from "./initiateRabbitConsumer";

export const initializeRabbit = async () => {
  await menash.connect(config.rabbit.uri);
  await menash.declareQueue(config.rabbit.queueName, { durable: true, autoDelete: false, });
  await rabbitConsumer()

  console.log("Rabbit connected");
};
