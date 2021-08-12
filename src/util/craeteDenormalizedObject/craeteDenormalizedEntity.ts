import config from "../../config";
import { Entity, DenormalizedEntity } from "../../config/types";
import { craeteDenormalizedDigitalIdentity } from "./craeteDenormalizedDigitalIdentity";
import { craeteDenormalizedRole } from "./craeteDenormalizedRole";
import { getConnectedObject } from "../getConnectedObject";
import { digitalIdentityModel, entityModel } from "../repo/models";
import { find, findOne } from "../repo/repository";

// TODO generic fields( .id , .uniqueId etc)
export const craeteDenormalizedEntity = async (entityId: Entity) => {
  const entity = await find(entityModel, { id: entityId });
  const DIs = await find(digitalIdentityModel, { entityId: entityId });
  const populatedDIs = await Promise.all(
    DIs.map(craeteDenormalizedDigitalIdentity)
  );
  const primaryDIId = entity.primaryDigitalIdentityId;
  const primaryDI = await findOne(digitalIdentityModel, { uniqueId: primaryDIId });
  const primaryRole = await getConnectedObject(primaryDIId, config.mongo.digitalIdentityCollectionName, config.mongo.roleCollectionName);
  const denormalizedPrimaryRole = await craeteDenormalizedRole(primaryRole);

  const displayNameValue = denormalizedPrimaryRole.displayName;
  const directGroupValue = denormalizedPrimaryRole.directGroup;
  const hierarchyValue = denormalizedPrimaryRole.hierarchy;
  const fullNameValue = entity.firstName + entity.lastname;
  const jobTitleValue = denormalizedPrimaryRole.jobTitle;
  const hierarchyIdsValue = denormalizedPrimaryRole.hierarchyIds;
  const mailValue = primaryDI.mail;

  delete entity.primaryDigitalIdentityId;
  const denormalizedEntity = {
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
  return denormalizedEntity;
};
