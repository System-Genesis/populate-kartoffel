import menash, { ConsumerMessage } from "menashmq";
import config from "../../config/index";
import startUpdateProccess from "../startUpdateProccess";

export async function rabbitConsumer() {
  await menash.queue(config.rabbit.queueName).activateConsumer((msg: ConsumerMessage) => {
    const changeEventObject = msg.getContent();
    console.log(`change accepted from rabbit: ${JSON.stringify(changeEventObject)}`);
    startUpdateProccess(changeEventObject)
    msg.ack();
  }, { noAck: false });
}
