import { Model, Schema } from "mongoose";
import config from "..";
import { Entity } from "../types";

export default new Schema<Entity, Model<Entity>, Entity>(
  {
    _id: { type: Schema.Types.ObjectId, unique: true, sparse: true },
    entityType: String, // enum
    identityCard: String,
    personalNumber: String,
    employeeNumber: String,
    organization: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    dischargeDay: Date,
    rank: String, // enum
    phone: [String],
    address: String,
    clearance: String, // String,of number - enum
    fullClearance: String,
    sex: String,
    birthDate: Date,
    mobilePhone: [String], //value object
    goalUserId: String,
    primaryDigitalIdentityId: String,//-
    pictures: {
      profile: {
        meta: {
          path: String,
          format: String,
          takenAt: Date,
          updatedAt: Date,
        },
      }
    },
  }, {
  collection: config.mongo.entityCollectionName,
  versionKey: false,
  timestamps: true,
}
);
