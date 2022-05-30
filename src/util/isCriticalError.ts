import config from "../config"

export default async(changedObjectId)=>{
  if (!changedObjectId.populateKartoffelRetries) return false
  else return changedObjectId.populateKartoffelRetries >= config.retriesBeforeCriticalErrorAlert
}