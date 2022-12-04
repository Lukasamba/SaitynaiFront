import Client from '../client';
import Http from '../../http';
import { MoviesListResponse } from '../../types/movies';

class Movies extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      MOVIES_LIST: `${this.http.baseUrl}/movies`,
    };
  }

  getList = (): Promise<MoviesListResponse[]> => {
    return this.http.get(this.api.MOVIES_LIST);
  };
}

export default Movies;
