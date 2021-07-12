import { Entity, DigitalIdentity, DenormalizedDigitalIdentity, DenormalizedEntity } from "../config/types";
import { digitalIdentityModel, roleModel } from "./repo/models";
import { find, findOne } from "./repo/repository";

export default async (entity :Entity) => {
    const DIs = await find(digitalIdentityModel, {entityId: entity.id});
    const populatedDIs = await Promise.all(DIs.map(async (DI: DigitalIdentity)  => {
            const DIRole = await findOne(roleModel, { digitalIdentityUniqueId: DI.uniqueId });
            return { ...DI, role: DIRole } as DenormalizedDigitalIdentity;
    }))as DenormalizedDigitalIdentity[]

    
    
    const denormalizedEntity = { ...entity, digitalIdentities: populatedDIs } as DenormalizedEntity
    return denormalizedEntity 
};
