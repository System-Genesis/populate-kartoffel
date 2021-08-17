import faker from "faker";
import config from "../config/index";
import {
  digitalIdentityModel,
  entityModel,
  organizationGroupModel,
  roleModel,
} from "../util/repo/models";
import { db } from "./db";

const mocksData = db;

export const generateCollections = async () => {
  mocksData["entities"].forEach(async (element: any) => {
    await entityModel.create(element).catch((err) => {
      if (err.code != config.errorCodes.duplicateKey)
        console.error("mocks generator error:", err);
    });
  });
  mocksData["digitalIdentities"].forEach(async (element: any) => {
    await digitalIdentityModel.create(element).catch((err) => {
      if (err.code != config.errorCodes.duplicateKey)
        console.error("mocks generator error:", err);
    });
  });
  mocksData["roles"].forEach(async (element: any) => {
    await roleModel.create(element).catch((err) => {
      if (err.code != config.errorCodes.duplicateKey)
        console.error("mocks generator error:", err);
    });
  });
  mocksData["groups"].forEach(async (element: any) => {
    await organizationGroupModel.create(element).catch((err) => {
      if (err.code != config.errorCodes.duplicateKey)
        console.error("mocks generator error:", err);
    });
  });
};

export const updatePersonsOnCommend = async (entityId) => {
  const randomFirstName = faker.name.firstName();

  return await entityModel
    .findOneAndUpdate(
      { id: entityId },
      {
        $set: { firstName: randomFirstName },
      }
    )
    .lean();
};

export const disconnectDIOnCommend = async (DIId) => {
  return await digitalIdentityModel
    .findOneAndUpdate(
      { uniqueId: DIId },
      {
        $set: { entityId: undefined },
      }
    )
    .lean();
};

export const connectDIOnCommend = async (DIId, destEntityId) => {
  return await digitalIdentityModel
    .findOneAndUpdate(
      { uniqueId: DIId },
      {
        $set: { entityId: destEntityId },
      }
    )
    .lean();
};
