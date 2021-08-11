import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedEntity } from "../types";
import denormalizedDigitalIdentitySchema from "./denormalizedDigitalIdentitySchema";

export default new Schema<DenormalizedEntity, Model<DenormalizedEntity>, DenormalizedEntity> (
  {
    id: { type: String, unique: true, sparse: true },
    displayName: String,// added
    directGroup: String,//added
    hierarchy: String,
    hierarchyIds: [String],//added
    entityType: String,
    identityCard: String,
    personalNumber: String,
    goalUserId: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    fullName: String,//added
    dischargeDate: Date,
    rank: String, 
    mail: String, //added
    jobTitle: String, //added
    phone: String,
    mobilePhone: String,
    address: String,
    clearance: String, 
    pictures:{
      profile:{ 
        path: String,
        meta: Object,
      }
    },
    sex: String,
    birthDate: Date,
    digitalIdentities: [denormalizedDigitalIdentitySchema],//added
  }, {
    versionKey: false,
    timestamps: true,
    collection: config.mongo.denormalizedEntityCollectionName }
);
