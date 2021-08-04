import config from "../config";
import { Entity, DigitalIdentity, DenormalizedDigitalIdentity, DenormalizedEntity, OrganizationGroup, Role } from "../config/types";
import { digitalIdentityModel, entityModel, roleModel } from "./repo/models";
import { find, findOne } from "./repo/repository";

// TODO generic fields( .id , .uniqueId etc)
const craeteDenormalizedEntity = async (entityId: Entity) => {
  const entity = await find(entityModel, { id: entityId });
  const DIs = await find(digitalIdentityModel, { entityId: entityId });
  const populatedDIs = (await Promise.all(
    DIs.map(async (DI: DigitalIdentity) => {
      const DIRole = await findOne(roleModel, {
        digitalIdentityUniqueId: DI.uniqueId,
      });
      return { ...DI, role: DIRole } as DenormalizedDigitalIdentity;
    })
  )) as DenormalizedDigitalIdentity[];

  const denormalizedEntity = {
    ...entity,
    digitalIdentities: populatedDIs,
  } as unknown as DenormalizedEntity;
  return denormalizedEntity;
};

const craeteDenormalizedDigitalIdentity = async (digitalIdentity: DigitalIdentity) => {
  return digitalIdentity as DigitalIdentity;
};

const craeteDenormalizedOrganizationGroup = async (organizationGroup: OrganizationGroup) => {
  return organizationGroup as OrganizationGroup;
};

const craeteDenormalizedRole = async (role: Role) => {
  return role as Role;
};

export default {
  [config.mongo.entityCollectionName]: craeteDenormalizedEntity,
  [config.mongo.digitalIdentityCollectionName]: craeteDenormalizedDigitalIdentity,
  [config.mongo.organizationGroupCollectionName]: craeteDenormalizedOrganizationGroup,
  [config.mongo.roleCollectionName]: craeteDenormalizedRole,
};
