import {Info, IInfo} from '../models/info-model'
import {IResponse} from "../interface/response-interface";

class InfoController {
  
  constructor() {
  }
  
  public async findByCode(code: number): Promise<IResponse> {
    if (code === undefined) return { error: true, status: 400 };
    
    let info: IInfo;
    try { info = await Info.find({ code }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 200, info };
  }
  
  public async create(lat: number, lng: number, contents: string, code: number): Promise<IResponse> {
    if (lat === undefined || lng === undefined || contents === undefined || code === undefined) return { error: true, status: 400 };
    
    try {
      await Info.create({
        lat,
        lng,
        contents,
        code
      })
    }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 201 };
  }
  
}

export default new InfoController;