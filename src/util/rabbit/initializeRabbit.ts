import menash from "menashmq";
import config from "../../config/index";

export const initializeRabbit = async () => {
  await menash.connect(config.rabbit.uri);
  await menash.declareTopology({
    queues: [
      {
        options: {
          prefetch: config.prefetchAmount,
          durable: true,
          autoDelete: false,
        },
        name: config.rabbit.queueName,
      },
    ],
  });

  console.log("Rabbit connected");
};
