import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedEntity } from "../types";
import denormalizedDigitalIdentitySchema from "./denormalizedDigitalIdentitySchema";

export default new Schema<DenormalizedEntity, Model<DenormalizedEntity>, DenormalizedEntity> (
  {
    id: { type: String, unique: true, sparse: true },
    entityType: String,
    identityCard: String,
    personalNumber: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    dischargeDate: Date,
    rank: String, 
    phone: [String],
    address: String,
    clearance: String, 
    sex: String,
    birthDate: Date,
    goalUserId: String,
    mobilePhone: [String],
    displayName: String,// added
    directGroup: String,//added
    hierarchy: String,//added
    fullName: String,//added
    mail: String, //added
    jobTitle: String, //added
    hierarchyIds: [String],//added
    pictures:{
      profile:{ 
        path: String,
        meta: Object,
      }
    },
    digitalIdentities: [denormalizedDigitalIdentitySchema],//added
  }, {
    versionKey: false,
    timestamps: true,
    collection: config.mongo.denormalizedEntityCollectionName }
);
