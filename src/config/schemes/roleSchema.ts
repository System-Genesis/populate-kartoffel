import { Schema } from 'mongoose';

export default new Schema({
    // Role's Basic information
    roleId: String,
    jobTitle: String,
    digitalIndentityUniqueId: String,
    directGroup: String,
    hierarchy: String,
    hierarchyIds: [String],
    createdAt: Date,
    updatedAt: Date,
    source: String,
});
