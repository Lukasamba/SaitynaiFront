import Client from '../client';
import Http from '../../http';
import { MovieCreateRequest, MoviesListResponse } from '../../types/movies';
import { EmptyResponse } from '../../types/auth';

class Movies extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      MOVIES_LIST: `${this.http.baseUrl}/movies`,
      MOVIE: `${this.http.baseUrl}/movies/{movieId}`,
    };
  }

  getList = (): Promise<MoviesListResponse[]> => {
    return this.http.get(this.api.MOVIES_LIST);
  };

  create = (data: MovieCreateRequest): Promise<EmptyResponse[]> => {
    return this.http.post(this.api.MOVIES_LIST, data);
  };

  delete = (movieId: string): Promise<EmptyResponse[]> => {
    return this.http.delete(this.buildUrl(this.api.MOVIE, { movieId }));
  };
}

export default Movies;
