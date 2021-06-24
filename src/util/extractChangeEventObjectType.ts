import { MyChangeEvent } from "../config/types";

export default (changeEventObject : MyChangeEvent)  => {
    return changeEventObject.description.ns.coll
};
