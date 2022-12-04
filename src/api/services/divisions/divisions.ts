import Client from '../client';
import Http from '../../http';
import { DivisionsListResponse } from '../../types/divisions';

class Divisions extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      DIVISIONS_LIST: `${this.http.baseUrl}/divisions`,
    };
  }

  getList = (): Promise<DivisionsListResponse[]> => {
    return this.http.get(this.api.DIVISIONS_LIST);
  };
}

export default Divisions;
