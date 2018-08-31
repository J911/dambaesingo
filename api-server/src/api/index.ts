import RouterAbstract from '../router-abstract'
import Info from './info-route'

class Api extends RouterAbstract {
  
  private static instance = new Api();
  
  constructor() {
    if (!!Api.instance) return Api.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.use('/info', Info.route);
  }
  
}

export default new Api;