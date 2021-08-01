import { Timestamp } from "mongodb";
import { Types } from "mongoose";
// import config from "./index";

export interface MyChangeEvent extends Object {
  _id: String;
  eventId: String;
  timeStamp: Timestamp;
  description: Description;
  isSentToRabbit: Boolean;
  createdAt: Date;
  v: Number;
};

export interface Description extends Object {
  id: { data: String };
  operationType: String;
  clusterTime: String;
  fullDocument: object;
  timeStamp: Timestamp;
  ns: { db: string; coll: string };
  documentKey: { id: string };
  updateDescription: {
    updatedFields : Object,
    removedFields : [ string ],
 },
};

export interface DigitalIdentity extends Object {
  // DI's Basic information
  type: string;
  source: string;
  mail?: string;
  uniqueId: string;
  entityId?: string;
  isRoleAttachable: boolean;
};

export interface DenormalizedDigitalIdentity extends DigitalIdentity {
  // DI's Basic information
  role: Role[]
};

export interface Entity extends Object {
  // Entity's Basic information
  id: Types.ObjectId;
  firstName: string;
  lastName?: string;
  entityType: String;
  hierarchy?: string;
  displayName?: string;
  personalNumber?: string; // use value object
  identityCard?: string;
  rank?: string; //use vale object / enum
  akaUnit?: string;
  clearance?: number; // value object
  mail?: string; //value object
  sex?: String;
  serviceType?: string; //value object
  dischargeDate?: Date;
  birthDate?: Date;
  jobTitle?: string;
  address?: string; // value?
  phone?: string[]; //value object
  mobilePhone?: string[]; //value object
  goalUserId?: string;
};

export interface OrganizationGroup extends Object {
  // OG's Basic information
  id: Types.ObjectId;
  source: string;
  name: string;
  ancestors: Types.ObjectId[];
  hierarchy: string;
  directGroup?: Types.ObjectId;
  childrenNames: string[];
  status?: string;
  akaUnit?: string;
}

export interface Role extends Object {
  // Role's Basic information
  roleId: string;
  jobTitle?: string;
  digitalIdentityUniqueId?: string;
  directGroup: string;
  hierarchy: string;
  hierarchyIds: string[];
  source: string;
};

export interface DenormalizedEntity extends Object {
  // Entity's Basic information
  id: string;
  displayName: string;
  entityType: string; // enum
  identityCard: string;
  personalNumber: string;
  serviceType: string;
  firstName: string;
  lastName: string;
  akaUnit: string;
  status: string;
  dischargeDate: Date;
  rank: string; // enum
  mail: string;
  job: string;
  phone: string;
  mobilePHone: string;
  address: string;
  clearance: string; // string of number - enum
  sex?: string;
  birthDate?: Date;
  digitalIdentities: DenormalizedDigitalIdentity[];
};
