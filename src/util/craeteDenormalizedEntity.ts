import { Entity, DigitalIdentity, DenormalizedDigitalIdentity, DenormalizedEntity } from "../config/types";
import { digitalIdentityModel, roleModel } from "./repo/models";
import { find } from "./repo/repository";

export default async (entity :Entity) => {
    const DIs = await find(digitalIdentityModel, {entityId: entity.id});
    const populatedDIs = DIs.map(async (DI: DigitalIdentity)  => {
        const DIRole = await find(roleModel, { digitalIndentityUniqueId: DI.uniqueId });
        return { ...DI, role: DIRole } as unknown as DenormalizedDigitalIdentity;
    })
    const denormalizedEntity = { ...entity, populatedDIs } as unknown as DenormalizedEntity
    return denormalizedEntity 
};
