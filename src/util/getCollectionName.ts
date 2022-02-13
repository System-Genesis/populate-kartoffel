import { MyChangeEvent } from "../config/types";

/**
 * extract from the changeEventObject the collection of the change
 * @param changeEventObject the change stream event object
 */
export default (changeEventObject : MyChangeEvent)  => {
    try {
        
        return changeEventObject.description.ns.coll
    } catch (error) {
     return ''   
    }
};
