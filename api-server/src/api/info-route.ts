import {Request, Response} from 'express'

import RouterAbstract from '../router-abstract'
import InfoController from '../controller/info-controller'

class InfoRoute extends RouterAbstract {
  
  private static instance = new InfoRoute();
  
  constructor() {
    if (!!InfoRoute.instance) return InfoRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.get('/:code', this.getInfoByCode);
    this.router.post('/', this.registInfo);
  }
  
  private async getInfoByCode(req: Request, res: Response): Promise<Response> {
    const code = req.params.code;

    const result = await InfoController.findByCode(code);
    if (result.error || result.info === undefined) return res.sendStatus(result.status);
    if (result.info === null) return res.sendStatus(404);
    
    return res.status(200).json({ info: result.info });
  }
  
  private async registInfo(req: Request, res: Response): Promise<Response> {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const contents = req.body.contents || '';
    const code = req.body.code;
    
    const result = await InfoController.create(lat, lng, contents, code);
    
    return res.sendStatus(result.status);
  }
  
}

export default new InfoRoute;