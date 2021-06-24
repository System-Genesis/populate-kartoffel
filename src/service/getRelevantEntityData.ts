import { DigitalIdentity, Entity, MyChangeEvent, OrganizationGroup, Role } from '../config/types'
import extractChangeEventObjectType from '../util/extractChangeEventObjectType'
import getDigitalIdentities from '../util/getDigitalIdentities';
import getEntity from '../util/getEntity';
import getOrganizationGroup from '../util/getOrganizationGroup';
import getRole from '../util/getRole';

export default async (changeEventObject: MyChangeEvent) => {
  const changeEventObjectType = extractChangeEventObjectType(changeEventObject);
  const entity = getEntity(changeEventObject,changeEventObjectType);
  const digitalIdentities = getDigitalIdentities(changeEventObject,changeEventObjectType);
  const organizationGroup = getOrganizationGroup(changeEventObject,changeEventObjectType);
  const role = getRole(changeEventObject,changeEventObjectType);
  return { entity, digitalIdentities, organizationGroup, role };
};
