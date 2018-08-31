import {IInfo} from "../models/info-model";

export interface IResponse {
  error: boolean,
  status: number,
  info?: IInfo,
}
