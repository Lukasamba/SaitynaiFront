import Client from '../client';
import Http from '../../http';
import {
  DivisionCreateRequest,
  DivisionResponse,
  DivisionsListResponse,
  DivisionUpdateRequest,
} from '../../types/divisions';
import { EmptyResponse } from '../../types/auth';

class Divisions extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      DIVISIONS_LIST: `${this.http.baseUrl}/divisions`,
      DIVISIONS_CREATE: `${this.http.baseUrl}/divisions`,
      DIVISION: `${this.http.baseUrl}/divisions/{divisionId}`,
    };
  }

  getList = (): Promise<DivisionsListResponse> => {
    return this.http.get(this.api.DIVISIONS_LIST);
  };

  create = (data: DivisionCreateRequest): Promise<EmptyResponse> => {
    return this.http.post(this.api.DIVISIONS_CREATE, data);
  };

  get = (divisionId: number): Promise<DivisionResponse> => {
    return this.http.get(this.buildUrl(this.api.DIVISION, { divisionId }));
  };

  edit = (divisionId: number, data: DivisionUpdateRequest): Promise<EmptyResponse> => {
    return this.http.put(this.buildUrl(this.api.DIVISION, { divisionId }), data);
  };

  delete = (divisionId: number): Promise<EmptyResponse> => {
    return this.http.delete(this.buildUrl(this.api.DIVISION, { divisionId }));
  };
}

export default Divisions;
