import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedRole } from "../types";

export default new Schema<DenormalizedRole, Model<DenormalizedRole>, DenormalizedRole>(
  {
    roleId: { type: String, unique: true, sparse: true },
    jobTitle: String,
    digitalIdentityUniqueId: String,
    directGroup: Schema.Types.ObjectId,
    source: String,
    clearance: String,
    displayName: String,// hirerchy / job ?- /fullname(if connected to person)
    hierarchy: String,//added
    hierarchyIds: [String],//added
  },{
    versionKey: false,
    timestamps: true,
    collection: config.mongo.denormalizedRoleCollectionName
  }
);
