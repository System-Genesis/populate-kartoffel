import { Model, Schema } from "mongoose";
import config from "..";
import { Role } from "../types";

export default new Schema<Role, Model<Role>, Role>(
  {
    roleId: { type: String, unique: true, sparse: true },
    jobTitle: String,
    digitalIdentityUniqueId: String,
    directGroup: Schema.Types.ObjectId,
    source: String,
    clearance: String,
  },{
    versionKey: false,
    timestamps: true,
    collection: config.mongo.roleCollectionName 
  }
);
