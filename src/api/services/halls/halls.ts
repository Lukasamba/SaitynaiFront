import Client from '../client';
import Http from '../../http';
import {
  HallCreateRequest,
  HallResponse,
  HallsListResponse,
  HallUpdateRequest,
} from '../../types/halls';
import { EmptyResponse } from '../../types/auth';

class Halls extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      HALLS_LIST: `${this.http.baseUrl}/halls`,
      HALLS_CREATE: `${this.http.baseUrl}/halls`,
      HALL: `${this.http.baseUrl}/halls/{hallId}`,
    };
  }

  getList = (): Promise<HallsListResponse> => {
    return this.http.get(this.api.HALLS_LIST);
  };

  create = (data: HallCreateRequest): Promise<EmptyResponse> => {
    return this.http.post(this.api.HALLS_CREATE, data);
  };

  get = (hallId: number): Promise<HallResponse> => {
    return this.http.get(this.buildUrl(this.api.HALL, { hallId }));
  };

  edit = (hallId: number, data: HallUpdateRequest): Promise<EmptyResponse> => {
    return this.http.put(this.buildUrl(this.api.HALL, { hallId }), data);
  };

  delete = (hallId: number): Promise<EmptyResponse> => {
    return this.http.delete(this.buildUrl(this.api.HALL, { hallId }));
  };
}

export default Halls;
