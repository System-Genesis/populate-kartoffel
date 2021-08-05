import { MyChangeEvent } from "../../src/config/types";
import startUpdateProccess from "../../src/service/startUpdateProccess";
import regularChangeUpdate from "../../src/service/regularChangeUpdate";
import connectionChangeUpdate from "../../src/service/connectionChangeUpdate";
import * as getEntity from "../../src/util/getConnectedObject/getEntity";

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
};

const changeEventObjectRegularTest = {
  _id: "60f568e6637e9fd1ed811786",
  createdAt: "2021-07-19T11:58:30.851Z",
  description: {
    _id: {
      _data:
        "8260F568E6000000022B022C0100296E5A1004B6F1CC0…85646645F6964006460EFDD7B110497532A98D2AD0004",
    },
    clusterTime: "6986605733986959362",
    documentKey: { _id: "60efdd7b110497532a98d2ad" },
    fullDocument: {
      _id: "60efdd7b110497532a98d2ad",
      akaUnit: "gondor",
      clearance: "2",
      entityType: "agumon",
      firstName: "Ryley",
      id: "03dr4e3s233",
      job: "International Identity Technician",
      lastName: "Lang",
      personalNumber: "7842365",
      rank: "champion",
    },
    ns: { db: "kartoffelMock", coll: "entity" },
    operationType: "update",
    updateDescription: {
      updatedFields: { firstName: "Ryley" },
      removedFields: Array(0),
    },
  },
  eventId:
    "8260F568E6000000022B022C0100296E5A1004B6F1CC06B31941B087CC1C979D23885646645F6964006460EFDD7B110497532A98D2AD0004",
  isSentToRabbit: false,
  timeStamp: 1626695910,
  __v: 0,
} as unknown as MyChangeEvent;

const changeObjectToConnectionTest = (object) => {
  const newObject = JSON.parse(JSON.stringify(object));
  newObject["description"].updateDescription = {
    updatedFields: { entityId: "1234567" },
    removedFields: Array(0),
  };
  newObject["description"].ns.coll = "digitalIdentity" ;
  newObject["description"].fullDocument = {
    _id: "60f5ecf4c9549fbf8960fe1d",
    type: "domUser",
    source: "city_name",
    uniqueId: "g724994112@city.com",
    isRoleAttachable: true,
    entityId: "13dr4e3s233",
  };
  return newObject;
};

const operationTypeUnvalidTest = (object) => {
  const newObject = JSON.parse(JSON.stringify(object));
  newObject["description"].operationType = "drop" ;
  return newObject;
};

jest.mock("../../src/service/regularChangeUpdate", () => jest.fn());

jest.mock("../../src/service/connectionChangeUpdate", () => jest.fn());

jest.mock("../../src/util/getEntity", () => {
  return {
    getEntityFromChangeEvent: jest.fn(
      async (changeEventObject: MyChangeEvent) => {
        if (changeEventObject) return entityMock;
        return null;
      }
    ),
    getEntityOptions: jest.fn(),
    default: jest.fn(),
  };
});

describe("startUpdateProccess test", () => {
  afterEach(() => {    
    jest.clearAllMocks();
  });
  
  test("should start regularChangeUpdate flow", async () => {
    await startUpdateProccess(changeEventObjectRegularTest);
    expect(getEntity.getEntityFromChangeEvent).toHaveBeenCalled();
    expect(regularChangeUpdate).toHaveBeenCalled();
  });
  test("should start connectionChangeUpdate flow", async () => {
    const changeEventObjectConnectionObject = changeObjectToConnectionTest(changeEventObjectRegularTest);
    await startUpdateProccess(changeEventObjectConnectionObject);
    expect(getEntity.getEntityFromChangeEvent).toHaveBeenCalled();
    expect(connectionChangeUpdate).toHaveBeenCalled();
  });
  test("case of operationType unvalid, should not start any flow", async () => {
    const changeObjectUnvalid = operationTypeUnvalidTest(changeEventObjectRegularTest);
    await startUpdateProccess(changeObjectUnvalid);
    expect(getEntity.getEntityFromChangeEvent).not.toHaveBeenCalled();
    expect(connectionChangeUpdate).not.toHaveBeenCalled();
    expect(regularChangeUpdate).not.toHaveBeenCalled();
  });
  test("case of no changeEventObject, should not start any flow", async () => {
    await startUpdateProccess({} as MyChangeEvent);
    expect(getEntity.getEntityFromChangeEvent).not.toHaveBeenCalled();
    expect(connectionChangeUpdate).not.toHaveBeenCalled();
    expect(regularChangeUpdate).not.toHaveBeenCalled();
  });
});
