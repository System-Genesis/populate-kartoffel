import { Model, Schema } from "mongoose";
import config from "..";
import { Entity } from "../types";

export default new Schema<Entity, Model<Entity>, Entity>(
  {
    id: { type: String, unique: true, sparse: true},
    displayName: String,
    entityType: String, // enum
    identityCard: String,
    personalNumber: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    dischargeDate: Date,
    rank: String, // enum
    mail: String,
    phone: String,
    address: String,
    clearance: String, // String,of number - enum
    sex: String,
    birthDate: Date,
    jobTitle: String,
    mobilePhone: [String], //value object
    goalUserId: String,
  },{ 
    collection: config.mongo.entityCollectionName,
    versionKey: false,
    timestamps: true,
  }
);
