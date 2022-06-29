import collectionsMap from '../config/collectionsMap';
import { findOne } from '../infra/repo/repository';
import config from '../config';

const mongo = config.mongo;

export default async (reqBody: Object, collectionName: string): Promise<string> => {
    const identifierType = Object.keys(reqBody)[0];
    const id = reqBody[identifierType];

    const identifier = findObjectIdMap[collectionName][identifierType];
    const fullObject = await findOne(collectionsMap.modelsMap[collectionName], { [identifier]: id });
    console.log(fullObject._id)
    return fullObject?._id;
};

const objectIdsEntity = {
    identityCard: 'identityCard',
    personalNumber: 'personalNumber',
};

const objectIdsDI = {
    uniqueId: 'uniqueId',
};

const objectIdsOG = {
    hierarchy: 'hierarchy',
};

const objectIdsRole = {
    roleId: 'roleId',
};

const findObjectIdMap = {
    [mongo.entityCollectionName]: objectIdsEntity,
    [mongo.digitalIdentityCollectionName]: objectIdsDI,
    [mongo.roleCollectionName]: objectIdsOG,
    [mongo.roleCollectionName]: objectIdsRole,
};
