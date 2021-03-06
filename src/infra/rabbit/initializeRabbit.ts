import menash from "menashmq";
import config from "../../config/index";

const { rabbit, prefetchAmount } = config;

export const initializeRabbit = async () => {
  await menash.connect(config.rabbit.uri, config.rabbit.retryOptions);
  await menash.declareTopology({
    queues: [
      {
        options: {
          prefetch: prefetchAmount,
          durable: true,
          autoDelete: false,
        },
        name: rabbit.queueName,
      },
    ],
  });

  console.log("Rabbit connected");
};
