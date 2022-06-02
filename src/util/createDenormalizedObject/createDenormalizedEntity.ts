import config from "../../config";
import { DenormalizedEntity } from "../../config/types";
import { createDenormalizedDigitalIdentity } from "./createDenormalizedDigitalIdentity";
import { createDenormalizedRole } from "./createDenormalizedRole";
import { getConnectedObject } from "../getConnectedObject";
import { digitalIdentityModel, entityModel } from "../../infra/repo/models";
import { find, findOne } from "../../infra/repo/repository";
import { Types } from "mongoose";

export const createDenormalizedEntity = async (entityId: Types.ObjectId) => {
  const entity = await findOne(entityModel, {
    _id: entityId,
  });
  const DIs = await find(digitalIdentityModel, { entityId: entityId });
  const fullNameValue = `${entity.firstName} ${entity.lastName? entity.lastName: ''}`;
  let employeeIdValue : string | null = null;
  
  if (entity.organization && entity.employeeNumber) {
    employeeIdValue = `${entity.organization}-${entity.employeeNumber}`;
  }

  const primaryDIId = entity.primaryDigitalIdentityId;
  delete entity.primaryDigitalIdentityId;
  let denormalizedEntity = {
    ...entity,
    fullName: fullNameValue,
    employeeId: employeeIdValue,
    digitalIdentities: [],
  } as unknown as DenormalizedEntity;

  if (DIs.length != 0) {
    const populatedDIs = await Promise.all(
      DIs.map((DI) => createDenormalizedDigitalIdentity(DI.uniqueId))
    );
    denormalizedEntity.digitalIdentities = populatedDIs;

    if (primaryDIId) {
      const primaryDI = await findOne(digitalIdentityModel, {
        uniqueId: primaryDIId,
      });
      denormalizedEntity.mail = primaryDI.mail;

      const primaryRole = await getConnectedObject(
        primaryDIId,
        config.mongo.digitalIdentityCollectionName,
        config.mongo.roleCollectionName
      );

      if (primaryRole) {
        const denormalizedPrimaryRole = await createDenormalizedRole(
          primaryRole.roleId
        );
        denormalizedEntity.displayName = denormalizedPrimaryRole.displayName;
        denormalizedEntity.directGroup = denormalizedPrimaryRole.directGroup.toString();
        denormalizedEntity.hierarchy = denormalizedPrimaryRole.hierarchy;
        denormalizedEntity.jobTitle = denormalizedPrimaryRole.jobTitle;
        denormalizedEntity.hierarchyIds = denormalizedPrimaryRole.hierarchyIds;
      }
    }
  }
  if (denormalizedEntity.pictures && denormalizedEntity.pictures.profile && !denormalizedEntity.pictures.profile.url) {
    const identifier = entity.personalNumber || entity.identityCard;
    denormalizedEntity.pictures.profile.url = `${config.pictures.baseUrl}${identifier}/${config.pictures.urlSuffix}`;
  }

  return denormalizedEntity;
};
