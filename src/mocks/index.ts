import { generateCollections } from "./mocksGenerator"

/**
 * activating all the mocks functions
 */
export default async ()=>{
  await generateCollections()
}