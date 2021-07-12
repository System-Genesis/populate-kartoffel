import { MyChangeEvent } from "../config/types";

export default (changeEventObject : MyChangeEvent)  => {
    try {
        
        return changeEventObject.description.ns.coll
    } catch (error) {
     return ''   
    }
};
