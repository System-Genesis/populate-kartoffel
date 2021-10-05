import { Model, Schema } from "mongoose";
import config from "..";
import { Entity } from "../types";

export default new Schema<Entity, Model<Entity>, Entity>(
  {
    _id: { type: Schema.Types.ObjectId, unique: true, sparse: true},
    entityType: String, // enum
    identityCard: String,
    personalNumber: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    dischargeDay: Date,
    rank: String, // enum
    phone: [String],
    address: String,
    clearance: Number, // String,of number - enum
    sex: String,
    birthDate: Date,
    mobilePhone: [String], //value object
    goalUserId: String,
    primaryDigitalIdentityId: String,//-
    pictures:{
      profile:{ 
        path: String,
        meta: Object,
      }
    },
  },{ 
    collection: config.mongo.entityCollectionName,
    versionKey: false,
    timestamps: true,
  }
);
