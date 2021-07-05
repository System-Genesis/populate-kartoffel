import faker from "faker";
import { readFileSync } from "fs";
import config from "../config/index";
import { digitalIdentityModel, entityModel, roleModel } from "../util/repo/models";

const mocksData = JSON.parse(readFileSync('./src/mocks/db.json').toString())

export const generateCollections = async () => {
  try {
    await entityModel.insertMany(mocksData['entities']);
    await digitalIdentityModel.insertMany(mocksData['digitalIdentities']);
    await roleModel.insertMany(mocksData['roles']);
  } catch (err) {
    if( err.code != config.errorCodes.duplicateKey ) console.error("mocks generator error:", err)
  }
};

export const updatePersonsOnCommend = async () => {
  const randomFirstName = faker.name.firstName();

  return await entityModel.findOneAndUpdate({id:'03dr4e3s233'}, {
    $set: { 'firstName': randomFirstName} });
};
