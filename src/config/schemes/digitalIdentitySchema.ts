import { Model, Schema } from "mongoose";
import config from "..";
import { DigitalIdentity } from "../types";

export default new Schema<DigitalIdentity, Model<DigitalIdentity>, DigitalIdentity>(
  {
    type: String,
    source: String,
    mail: String,
    uniqueId: { type: String, unique: true, sparse: true },
    entityId: String,
    createdAt: Date,
    updatedAt: Date,
    isRoleAttachable: Boolean,
  },
  { collection: config.mongo.digitalIdentityCollectionName }
);
