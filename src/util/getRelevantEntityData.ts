import { changeEvent } from "../config/changeEventType";

export default async (changeEventObject: changeEvent): Promise<object> => {
  const entity = "bla"
  const  digitalIdentity = "bla"
  const  organizationGroup = "bla"
  const  role = "bla"
  return {entity, digitalIdentity, organizationGroup, role};
};
