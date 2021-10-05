import { Model, Schema ,Types } from "mongoose";
import config from "..";
import { DigitalIdentity } from "../types";

export default new Schema<DigitalIdentity, Model<DigitalIdentity>, DigitalIdentity>(
  {
    uniqueId: { type: String, unique: true, sparse: true },
    entityId: Types.ObjectId,
    type: String,
    source: String,
    mail: String,
    isRoleAttachable: Boolean,
  },{
    versionKey: false,
    timestamps: true, 
    collection: config.mongo.digitalIdentityCollectionName 
  }
);
