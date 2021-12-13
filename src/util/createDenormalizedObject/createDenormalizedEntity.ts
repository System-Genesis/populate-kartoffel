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

  let denormalizedEntity;
  const primaryDIId = entity.primaryDigitalIdentityId;
  delete entity.primaryDigitalIdentityId;
  if (DIs.length == 0) {
    const populatedDIs = [];

    denormalizedEntity = {
      ...entity,
      fullName: fullNameValue,
      digitalIdentities: populatedDIs,
    } as unknown as DenormalizedEntity;
  } else {
    const populatedDIs = await Promise.all(
      DIs.map((DI) => createDenormalizedDigitalIdentity(DI.uniqueId))
    );
    if (!primaryDIId) {
      denormalizedEntity = {
        ...entity,
        fullName: fullNameValue,
        digitalIdentities: populatedDIs,
      } as unknown as DenormalizedEntity;
    } else {
      const primaryDI = await findOne(digitalIdentityModel, {
        uniqueId: primaryDIId,
      });
      const mailValue = primaryDI.mail;

      const primaryRole = await getConnectedObject(
        primaryDIId,
        config.mongo.digitalIdentityCollectionName,
        config.mongo.roleCollectionName
      );
      if (!primaryRole) {
        denormalizedEntity = {
          ...entity,
          fullName: fullNameValue,
          mail: mailValue,
          digitalIdentities: populatedDIs,
        } as unknown as DenormalizedEntity;
      } else {
        const denormalizedPrimaryRole = await createDenormalizedRole(
          primaryRole.roleId
        );
        denormalizedEntity = {
          ...entity,
          displayName: denormalizedPrimaryRole.displayName,
          directGroup: denormalizedPrimaryRole.directGroup,
          hierarchy: denormalizedPrimaryRole.hierarchy,
          jobTitle: denormalizedPrimaryRole.jobTitle,
          hierarchyIds: denormalizedPrimaryRole.hierarchyIds,
          fullName: fullNameValue,
          mail: mailValue,
          digitalIdentities: populatedDIs,
        } as unknown as DenormalizedEntity;
      }
    }
  }

  if (denormalizedEntity.pictures && denormalizedEntity.pictures.profile && !denormalizedEntity.pictures.profile.url) {
    const identifier = entity.personalNumber || entity.identityCard;
    denormalizedEntity.pictures.profile.url = `${config.pictures.baseUrl}${identifier}/${config.pictures.urlSuffix}`;
  }

  return denormalizedEntity;
};

