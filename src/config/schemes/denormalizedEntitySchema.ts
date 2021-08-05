import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedEntity } from "../types";
import denormalizedDigitalIdentitySchema from "./denormalizedDigitalIdentitySchema";

export default new Schema<DenormalizedEntity, Model<DenormalizedEntity>, DenormalizedEntity> (
  {
    id: { type: String, unique: true, sparse: true },
    displayName: String,
    directGroup: String,
    hierarchy: String,
    entityType: String, // enum
    identityCard: String,
    personalNumber: String,
    goalUserId: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    fullName: String,
    status: String,
    dischargeDate: Date,
    rank: String, // enum
    mail: String,
    job: String,
    phone: String,
    mobilePHone: String,
    address: String,
    clearance: String, // String,of number - enum
    pictures:{
      profile:{ 
        url: String,
        meta: Object,
      }
    },
    sex: String,
    birthDate: Date,
    digitalIdentities: [denormalizedDigitalIdentitySchema],
  }, {
    versionKey: false,
    timestamps: true,
    collection: config.mongo.denormalizedEntityCollectionName }
);
