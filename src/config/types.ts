import { Timestamp } from "mongodb";

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
  mail: string;
  uniqueId: string;
  entityId: string;
  createdAt: Date;
  updatedAt: Date;
  isRoleAttachable: boolean;
};

export interface DenormalizedDigitalIdentity extends DigitalIdentity {
  // DI's Basic information
  role: Role[]
};

export interface Entity extends Object {
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
};

export interface OrganizationGroup extends Object {
  // OG's Basic information
  id: string;
  name: string;
  ancestors: string[];
  hierarchy: string;
  akaUnit: string;
  status: string;
  isLeaf: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface Role extends Object {
  // Role's Basic information
  roleId: string;
  jobTitle: string;
  digitalIndentityUniqueId: string;
  directGroup: string;
  hierarchy: string;
  hierarchyIds: string[];
  createdAt: Date;
  updatedAt: Date;
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
