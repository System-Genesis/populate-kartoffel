import config from "../../config";
import { DenormalizedEntity } from "../../config/types";
import { createDenormalizedDigitalIdentity } from "./createDenormalizedDigitalIdentity";
import { createDenormalizedRole } from "./createDenormalizedRole";
import { getConnectedObject } from "../getConnectedObject";
import { digitalIdentityModel, entityModel } from "../repo/models";
import { find, findOne } from "../repo/repository";
import { Types } from "mongoose";

// TODO generic fields( .id , .uniqueId etc)
export const createDenormalizedEntity = async (entityId: Types.ObjectId) => {
  const entity = await findOne(entityModel, {
    _id: entityId,
  });
  const DIs = await find(digitalIdentityModel, { entityId: entityId });

  const fullNameValue = entity.firstName + " " + entity.lastName;

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
      const primaryRole = await getConnectedObject(
        primaryDIId,
        config.mongo.digitalIdentityCollectionName,
        config.mongo.roleCollectionName
      );

      let roleDependencyFields; //todo role dependancy
      if(primaryRole){
        const denormalizedPrimaryRole = await createDenormalizedRole(
          primaryRole.roleId
          );
          roleDependencyFields.displayName = denormalizedPrimaryRole.displayName;
          roleDependencyFields.directGroup = denormalizedPrimaryRole.directGroup;
          roleDependencyFields.hierarchy = denormalizedPrimaryRole.hierarchy;
          roleDependencyFields.jobTitle = denormalizedPrimaryRole.jobTitle;
          roleDependencyFields.hierarchyIds = denormalizedPrimaryRole.hierarchyIds;
        }
        
      const mailValue = primaryDI.mail;
        
      denormalizedEntity = {
        ...entity,
        ...roleDependencyFields,
        fullName: fullNameValue,
        mail: mailValue,
        digitalIdentities: populatedDIs,
      } as unknown as DenormalizedEntity;
    }
  }

  return denormalizedEntity;
};
