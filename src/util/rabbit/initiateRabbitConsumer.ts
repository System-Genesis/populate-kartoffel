import menash, { ConsumerMessage } from "menashmq";
import { MyChangeEvent } from "../../config/types";
import config from "../../config/index";
import startUpdateProccess from "../../service/startUpdateProccess";

export async function rabbitConsumer() {
  await menash.queue(config.rabbit.queueName).activateConsumer(
    async (msg: ConsumerMessage) => {
      const changeEventObject = msg.getContent() as MyChangeEvent;
      console.log(
        `change accepted from rabbit: ${JSON.stringify(changeEventObject)}`
      );
      try {
        await startUpdateProccess(changeEventObject);
        msg.ack();
      } catch (err) {
        msg.nack(true);
        console.error(err);
      }
    },
    { noAck: false }
  );
}
