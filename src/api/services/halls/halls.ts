import Client from '../client';
import Http from '../../http';
import { HallsListResponse } from '../../types/halls';

class Halls extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      HALLS_LIST: `${this.http.baseUrl}/halls`,
    };
  }

  getList = (): Promise<HallsListResponse[]> => {
    return this.http.get(this.api.HALLS_LIST);
  };
}

export default Halls;
