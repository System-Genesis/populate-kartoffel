import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedEntity } from "../types";
import denormalizedDigitalIdentitySchema from "./denormalizedDigitalIdentitySchema";

export default new Schema<DenormalizedEntity, Model<DenormalizedEntity>, DenormalizedEntity>(
  {
    _id: { type: Schema.Types.ObjectId, unique: true, sparse: true },
    entityType: String,
    identityCard: String,
    personalNumber: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    dischargeDay: Date,
    rank: String,
    phone: [String],
    address: String,
    clearance: Number,
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
    pictures: {
      profile: {
        url: String,
        meta: {
          path: String,
          format: String,
          takenAt: Date,
          updatedAt: Date,
        },
      }
    },
    digitalIdentities: [denormalizedDigitalIdentitySchema],//added
  }, {
  versionKey: false,
  timestamps: true,
  collection: config.mongo.denormalizedEntityCollectionName
}
);
