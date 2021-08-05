import { Model, Schema } from "mongoose";
import config from "..";
import { Role } from "../types";

export default new Schema<Role, Model<Role>, Role>(
  {
    // Role's Basic information
    roleId: { type: String, unique: true, sparse: true },
    jobTitle: String,
    digitalIdentityUniqueId: String,
    directGroup: String,
    // hierarchy: String,
    // hierarchyIds: [String],
    source: String,
  },{
    versionKey: false,
    timestamps: true,
    collection: config.mongo.roleCollectionName 
  }
);
