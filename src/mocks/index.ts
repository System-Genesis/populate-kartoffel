import server from "./server"
import { generateCollections } from "./mocksGenerator"

export default async ()=>{
  await generateCollections()
  await server();
}