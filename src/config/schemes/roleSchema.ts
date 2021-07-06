import { Model, Schema } from 'mongoose';
import { Role } from '../types';

export default new Schema<Role,Model<Role>, Role>({
    // Role's Basic information
    roleId: { type: String, unique: true , sparse: true},
    jobTitle: String,
    digitalIdentityUniqueId: String,
    directGroup: String,
    hierarchy: String,
    hierarchyIds: [String],
    createdAt: Date,
    updatedAt: Date,
    source: String,
});
