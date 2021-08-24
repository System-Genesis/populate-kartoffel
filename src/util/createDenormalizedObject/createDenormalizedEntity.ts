import config from "../../config";
import { DenormalizedEntity } from "../../config/types";
import { createDenormalizedDigitalIdentity } from "./createDenormalizedDigitalIdentity";
import { createDenormalizedRole } from "./createDenormalizedRole";
import { getConnectedObject } from "../getConnectedObject";
import { digitalIdentityModel, entityModel } from "../repo/models";
import { find, findOne } from "../repo/repository";
import collectionsMap from "../../config/collectionsMap";

const digitalIdentityCollectionName =
  config.mongo.digitalIdentityCollectionName;

// TODO generic fields( .id , .uniqueId etc)
export const createDenormalizedEntity = async (entityId: string) => {
  const entity = await findOne(entityModel, { id: entityId });
  const DIs = await find(digitalIdentityModel, { entityId: entityId });

  const fullNameValue = entity.firstName + ' ' + entity.lastName;
  delete entity.primaryDigitalIdentityId;

  let denormalizedEntity;
  const primaryDIId = entity.primaryDigitalIdentityId;
  if (DIs.length == 0) {
    const populatedDIs = [];

    denormalizedEntity = {
      ...entity,
      fullName: fullNameValue,
      digitalIdentities: populatedDIs,
    } as unknown as DenormalizedEntity;
  } else {
    const populatedDIs = await Promise.all(
      DIs.map((DI) =>
        createDenormalizedDigitalIdentity(
          DI[collectionsMap.uniqueID[digitalIdentityCollectionName]]
        )
      )
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

      const denormalizedPrimaryRole = await createDenormalizedRole(primaryRole);

      const mailValue = primaryDI.mail;
      const displayNameValue = denormalizedPrimaryRole.displayName;
      const directGroupValue = denormalizedPrimaryRole.directGroup;
      const hierarchyValue = denormalizedPrimaryRole.hierarchy;
      const jobTitleValue = denormalizedPrimaryRole.jobTitle;
      const hierarchyIdsValue = denormalizedPrimaryRole.hierarchyIds;

      denormalizedEntity = {
        ...entity,
        displayName: displayNameValue,
        directGroup: directGroupValue,
        hierarchy: hierarchyValue,
        fullName: fullNameValue,
        mail: mailValue,
        jobTitle: jobTitleValue,
        hierarchyIds: hierarchyIdsValue,
        digitalIdentities: populatedDIs,
      } as unknown as DenormalizedEntity;
    }
  }

  return denormalizedEntity;
};
