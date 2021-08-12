import { DigitalIdentity, DenormalizedDigitalIdentity } from "../../config/types";
import { roleModel } from "../repo/models";
import { findOne } from "../repo/repository";

export const craeteDenormalizedDigitalIdentity = async (
  digitalIdentity: DigitalIdentity
) => {
  const DIRole = await findOne(roleModel, {
    digitalIdentityUniqueId: digitalIdentity.uniqueId,
  });
  return { ...digitalIdentity, role: DIRole } as DenormalizedDigitalIdentity;
};
