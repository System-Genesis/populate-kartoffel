import connectionChangeUpdate from "../../src/service/connectionChangeUpdate";
import { DenormalizedEntity, Entity } from "../../src/config/types";
import regularChangeUpdate from "../../src/service/regularChangeUpdate";
import { findOneAndUpdate, findOne } from "../../src/util/repo/repository";
import craeteDenormalizedEntity from "../../src/util/craeteDenormalizedEntity";
import * as getEntity from "../../src/util/getEntity";

const entityMockDest = {
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

const entityMockSource = {
  _id: "60f5ecf4c9549fbf8960fb18",
  id: "13dr4e3s233",
  entityType: "digimon",
  personalNumber: "9975416",
  firstName: "Layne",
  lastName: "Osinski",
  akaUnit: "gondor",
  rank: "rookie",
  job: "Chief Response Director",
  clearance: "5",
  __v: 0,
} as unknown as Entity;

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

jest.mock("../../src/service/regularChangeUpdate", () => jest.fn());

jest.mock("../../src/util/repo/repository", () => {
  return {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOne: jest.fn((model ,query) => query.undefined == undefined ? denormalizedEntityMock: null),
    default: jest.fn(),
  };
});

jest.mock("../../src/util/getEntity", () => {
  let handler = {
    get: function(target, name) {
      return target.hasOwnProperty(name) ? target[name] : jest.fn((Dentity)=> Dentity? entityMockSource: null);
    }
  };
  let mockGetEntityOptions= {};
  let p = new Proxy(mockGetEntityOptions, handler);

  return {
    getEntityFromChangeEvent: jest.fn(),
    getEntityOptions: p,
    default: jest.fn(),
  };
});

jest.mock("../../src/util/craeteDenormalizedEntity", () => jest.fn(()=> denormalizedEntityMock));

describe("startUpdateProccess test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should activate findOneAndUpdate", async () => {
    await connectionChangeUpdate(entityMockDest, "entity", "13dr4e3s233");
    expect(regularChangeUpdate).not.toHaveBeenCalled();
    expect(findOneAndUpdate).toHaveBeenCalled();
  });
  test("should activate regularChangeUpdate", async () => {
    await connectionChangeUpdate(entityMockDest, "noSourceCase", "13dr4e3s233");
    expect(regularChangeUpdate).toHaveBeenCalled();
    expect(findOneAndUpdate).not.toHaveBeenCalled();
  });
});
