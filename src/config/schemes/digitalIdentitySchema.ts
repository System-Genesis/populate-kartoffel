import { Schema } from 'mongoose';

export default new Schema({
    type: String,
    source: String,
    mail: String,
    uniqueId: String,
    entityId: String,
    createdAt: Date,
    updatedAt: Date,
    isRoleAttachable: Boolean,
    roleID: String,
});
