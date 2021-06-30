import { Model, Schema } from 'mongoose';
import { OrganizationGroup } from '../types';

export default new Schema<OrganizationGroup,Model<OrganizationGroup>, OrganizationGroup>({
    // OG's Basic information
    id: String,
    name: String,
    ancestors: [String],
    hierarchy: String,
    akaUnit: String,
    status: String,
    isLeaf: Boolean,
    createdAt: Date,
    updatedAt: Date,
});
