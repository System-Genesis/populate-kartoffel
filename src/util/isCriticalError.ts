import config from "../config"

/**
 * checks if the amount of retries is to big and becomes critical
 * @param changeEventObject the change stream event object(with the amount of retries)  
 * @returns {boolean} is it become a critical error or not
 */
export default async(changeEventObject)=>{
  if (!changeEventObject.populateKartoffelRetries) return false
  else return changeEventObject.populateKartoffelRetries >= config.retriesBeforeCriticalErrorAlert
}