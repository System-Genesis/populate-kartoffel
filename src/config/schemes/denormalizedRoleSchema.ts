import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedRole } from "../types";

export default new Schema<DenormalizedRole, Model<DenormalizedRole>, DenormalizedRole>(
  {
    roleId: { type: String, unique: true, sparse: true },
    displayName: String,// hirerchy / jeb ?- /fullname(if connected to person)
    jobTitle: String,
    digitalIdentityUniqueId: String,
    directGroup: String,
    hierarchy: String,//added
    hierarchyIds: [String],//added
    source: String,
  },{
    versionKey: false,
    timestamps: true,
    collection: config.mongo.roleCollectionName 
  }
);
