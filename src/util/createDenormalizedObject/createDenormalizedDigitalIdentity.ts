import { DenormalizedDigitalIdentity } from "../../config/types";
import { digitalIdentityModel, roleModel } from "../../infra/repo/models";
import { findOne } from "../../infra/repo/repository";
import { createDenormalizedRole } from "./createDenormalizedRole";

export const createDenormalizedDigitalIdentity = async (
  digitalIdentityId: string
) => {
  const digitalIdentity = await findOne(digitalIdentityModel, { uniqueId: digitalIdentityId });
  const DIRole = await findOne(roleModel, {
    digitalIdentityUniqueId: digitalIdentityId,
  });
  const denormalizedDIRole = DIRole? await createDenormalizedRole(DIRole.roleId) : null;
  return { ...digitalIdentity, role: denormalizedDIRole } as DenormalizedDigitalIdentity;
};
