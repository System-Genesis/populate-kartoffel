import { DenormalizedDigitalIdentity } from "../../config/types";
import { digitalIdentityModel, roleModel } from "../repo/models";
import { findOne } from "../repo/repository";

export const craeteDenormalizedDigitalIdentity = async (
  digitalIdentityId: string
) => {
  const digitalIdentity = await findOne(digitalIdentityModel, { uniqueId: digitalIdentityId });
  const DIRole = await findOne(roleModel, {
    digitalIdentityUniqueId: digitalIdentityId,
  });
  return { ...digitalIdentity, role: DIRole } as DenormalizedDigitalIdentity;
};
