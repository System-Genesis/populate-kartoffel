import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedEntity } from "../types";
import denormalizedDigitalIdentitySchema from "./denormalizedDigitalIdentitySchema";

export default new Schema<DenormalizedEntity, Model<DenormalizedEntity>, DenormalizedEntity> (
  {
    id: { type: String, unique: true, sparse: true },
    displayName: String,
    entityType: String, // enum
    identityCard: String,
    personalNumber: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    status: String,
    dischargeDate: Date,
    rank: String, // enum
    mail: String,
    job: String,
    phone: String,
    mobilePHone: String,
    address: String,
    clearance: String, // String,of number - enum
    sex: String,
    birthDate: Date,
    digitalIdentities: [denormalizedDigitalIdentitySchema],
  },
  { collection: config.mongo.denormalizedEntityCollectionName }
);
