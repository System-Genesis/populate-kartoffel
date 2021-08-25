import regularChangeUpdate from "../regularChangeUpdate";
import config from "../../config/index";
import { Entity } from "../../config/types";
import { Types } from "mongoose";

const entityCollectionName = config.mongo.entityCollectionName;

export default async (updetedEntity: Entity) => {
  if (updetedEntity) {
    const updatedEntityId = Types.ObjectId(updetedEntity._id as unknown as string);
    await regularChangeUpdate(updatedEntityId, entityCollectionName);
  }
};
