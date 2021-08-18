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
  mail?: string;
  uniqueId: string;
  entityId?: string;
  isRoleAttachable: boolean;
};

export interface Entity extends Object {
  // Entity's Basic information
  id: string;
  firstName: string;
  lastName?: string;
  entityType: String;
  personalNumber?: string; // use value object
  identityCard?: string;
  rank?: string; //use vale object / enum
  akaUnit?: string;
  clearance?: number; // value object
  sex?: String;
  serviceType?: string; //value object
  dischargeDate?: Date;
  birthDate?: Date;
  address?: string; // value?
  phone?: string[]; //value object
  mobilePhone?: string[]; //value object
  goalUserId?: string;
  primaryDigitalIdentityId: String;
  pictures:{
    profile:{ 
      path: String;
      meta: Object;
    }
  },
};

export interface OrganizationGroup extends Object {
  // OG's Basic information
  id: string;
  source: string;
  name: string;
  directGroup?: string;
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
  source: string;
};

export interface DenormalizedDigitalIdentity extends DigitalIdentity {
  role: Role[]
};

export interface DenormalizedOrganizationGroup extends OrganizationGroup {
  ancestors: string[];
  hierarchy: string;
}

export interface DenormalizedRole extends Role {
  displayName: string;
  hierarchy: string;
  hierarchyIds: string[];
};

export interface DenormalizedEntity extends Entity {
  displayName: string;
  directGroup: String;
  hierarchy: String;
  hierarchyIds: string[];
  fullName: String;
  mail: string;
  jobTitle: string;
  digitalIdentities: DenormalizedDigitalIdentity[];
};
