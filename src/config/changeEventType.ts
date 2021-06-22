import { Timestamp } from "mongodb";

export type changeEvent = {
    _id: String;
    eventId: String;
    timeStamp: Timestamp;
    description: object
    isSentToRabbit: Boolean;
    createdAt: Date;
    v:Number;
}