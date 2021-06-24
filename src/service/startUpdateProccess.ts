import { MyChangeEvent } from "../config/types";
import compareAndUpdate from "./compareAndUpdate";
import craeteDenormalizedEntity from "./craeteDenormalizedEntity";
import getRelevantEntityData from "./getRelevantEntityData";

export default async (changeEventObject: MyChangeEvent) => {
  const { entity, digitalIdentities, organizationGroup, role } = await getRelevantEntityData(changeEventObject);
  const denormalizedEntity = await craeteDenormalizedEntity( entity, digitalIdentities, organizationGroup, role );
  await compareAndUpdate(denormalizedEntity)
};
