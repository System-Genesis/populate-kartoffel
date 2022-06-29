import regularChangeUpdate from '../../../service/regularChangeUpdate';
import config from '../../../config';
import { Request, Response } from 'express';
import getObjectId from '../../../util/getObjectId';
import { findOne } from '../../repo/repository';
import collectionsMap from '../../../config/collectionsMap';

const mongo = config.mongo;

/**
 * populate specific object
 * @param {Request} req
 * @param {Response} res
 */
export default async ( req: Request, res: Response) => {
    let objectId = req.body.id;
    let collection = routs[req.params.type]
    if(!objectId){
        objectId = await getObjectId(req.body, collection)
    }

    let objectToPopulate = await findOne(collectionsMap.modelsMap[collection], {_id: objectId})
    if (!objectToPopulate) throw new Error('no object found that matches this id');
    res.json(await regularChangeUpdate(objectId, collection));
};

const routs = {
    entity: mongo.entityCollectionName,
    di: mongo.digitalIdentityCollectionName,
    role: mongo.roleCollectionName,
    group: mongo.roleCollectionName,
};


