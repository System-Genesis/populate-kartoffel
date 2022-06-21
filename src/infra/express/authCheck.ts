import { Request } from "express";
import config from "../../config";

export const authCheck =  async(req: Request) => {
  if(req.headers.authorization !== config.apiPassword) {
    throw new Error('No authorization token')
  }
};
