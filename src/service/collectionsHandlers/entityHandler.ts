import regularChangeUpdate from "../regularChangeUpdate";
import config from "../../config/index";
import { Entity } from "../../config/types";
import { Types } from "mongoose";

const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedEntity: Entity) => {
  if (!updatedEntity) {
    console.log(`trying to access to 'Entity' that doesn't exist`)
  } else {
    const updatedEntityId = Types.ObjectId(updatedEntity._id as unknown as string);
    await regularChangeUpdate(updatedEntityId, entityCollectionName);
  }
};
