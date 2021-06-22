import { changeEvent } from "../config/changeEventType";
import getRelevantEntityData from "./getRelevantEntityData"


export default async (changeEventObject: changeEvent)=>{
    const { entity, digitalIdentity, organizationGroup, role} = await getRelevantEntityData(changeEventObject);

    

}