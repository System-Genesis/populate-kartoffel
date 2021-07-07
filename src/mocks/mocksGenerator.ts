import faker from "faker";
import { readFileSync } from "fs";
import config from "../config/index";
import {
  digitalIdentityModel,
  entityModel,
  roleModel,
} from "../util/repo/models";
import path from "path"

const mocksData = JSON.parse(readFileSync(path.resolve(__dirname, "db.json"), 'utf8'));

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
};

export const updatePersonsOnCommend = async () => {
  const randomFirstName = faker.name.firstName();

  return await entityModel.findOneAndUpdate(
    { id: "03dr4e3s233" },
    {
      $set: { firstName: randomFirstName },
    }
  ).lean();
};
