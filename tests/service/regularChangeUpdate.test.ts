import { DenormalizedEntity, Entity } from "../../src/config/types";
import regularChangeUpdate from "../../src/service/regularChangeUpdate";
import { create, findOneAndUpdate } from "../../src/util/repo/repository";
import createDenormalizedEntity from "../../src/util/createDenormalizedEntity";

const entityMock = {
  id: "03dr4e3s233",
  entityType: "agumon",
  personalNumber: "7842365",
  firstName: "Hermann",
  lastName: "Lang",
  akaUnit: "gondor",
  rank: "champion",
  job: "International Identity Technician",
  clearance: "2",
  dischargeDay: "2013-09-17T12:56:02.245Z",
  mobilePhone: "0522701197",
} as unknown as Entity;

const addFindFlagToObject = (object) => {
  const newObject = JSON.parse(JSON.stringify(object));
  newObject.findFlag = true;
  return newObject;
};

const denormalizedEntityMock = {
  _id: "60f5ecf4c9549fbf8960fb17",
  id: "03dr4e3s233",
  entityType: "agumon",
  personalNumber: "7842365",
  firstName: "Hermann",
  lastName: "Lang",
  akaUnit: "gondor",
  rank: "champion",
  job: "International Identity Technician",
  clearance: "2",
  __v: 0,
  digitalIdentities: [
    {
      _id: "60f5ecf4c9549fbf8960fe1e",
      type: "domUser",
      source: "city_name",
      uniqueId: "e208059699@city.com",
      isRoleAttachable: true,
      entityId: "03dr4e3s233",
      role: [
        {
          hierarchyIds: ["1ew4r3d3d", "6ew4r3d3d"],
          _id: "60f5ecf4c9549fbf89610132",
          roleId: "e208059699@city",
          jobTitle: "International Identity Technician",
          digitalIdentityUniqueId: "e208059699@city.com",
          hierarchy: "wallmart/temporibus/quisquam",
          source: "city_name",
          directGroup: "22",
          __v: 0,
        },
      ],
    },
  ],
} as unknown as DenormalizedEntity;

jest.mock("../../src/util/repo/repository", () => {
  return {
    create: jest.fn(),
    findOneAndUpdate: jest.fn((DentityModel, filterQuery, Dentity) => {
      return !Dentity.findFlag ? Dentity : null;
    }),
    find: jest.fn(),
    default: jest.fn(),
  };
});

jest.mock("../../src/util/createDenormalizedEntity", () =>
  jest.fn(async (entity: Entity) => {
    if (entity['findFlag']) return addFindFlagToObject(denormalizedEntityMock);
    else if(entity)return denormalizedEntityMock;
    return null;
  })
);

describe("startUpdateProccess test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should activate findOneAndUpdate", async () => {
    await regularChangeUpdate(entityMock);
    expect(findOneAndUpdate).toHaveBeenCalled();
  });
  test("should activate create", async () => {
    const flaggedEntityMock = addFindFlagToObject(entityMock);
    await regularChangeUpdate(flaggedEntityMock);
    expect(create).toHaveBeenCalled();
  });
});
