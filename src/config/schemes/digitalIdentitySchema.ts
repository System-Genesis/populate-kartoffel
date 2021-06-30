import { Model, Schema } from 'mongoose';
import { DigitalIdentity } from '../types';

export default new Schema<DigitalIdentity,Model<DigitalIdentity>, DigitalIdentity>({
    type: String,
    source: String,
    mail: String,
    uniqueId: String,
    entityId: String,
    createdAt: Date,
    updatedAt: Date,
    isRoleAttachable: Boolean,
});
