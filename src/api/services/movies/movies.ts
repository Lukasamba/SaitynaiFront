import Client from '../client';
import Http from '../../http';
import {
  MovieCreateRequest,
  MovieResponse,
  MoviesListResponse,
  MovieUpdateRequest,
} from '../../types/movies';
import { EmptyResponse } from '../../types/auth';

class Movies extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      MOVIES_LIST: `${this.http.baseUrl}/movies`,
      MOVIE_CREATE: `${this.http.baseUrl}/movies`,
      MOVIE: `${this.http.baseUrl}/movies/{movieId}`,
    };
  }

  getList = (): Promise<MoviesListResponse> => {
    return this.http.get(this.api.MOVIES_LIST);
  };

  create = (data: MovieCreateRequest): Promise<EmptyResponse> => {
    return this.http.post(this.api.MOVIE_CREATE, data);
  };

  get = (movieId: number): Promise<MovieResponse> => {
    return this.http.get(this.buildUrl(this.api.MOVIE, { movieId }));
  };

  edit = (movieId: number, data: MovieUpdateRequest): Promise<EmptyResponse> => {
    return this.http.put(this.buildUrl(this.api.MOVIE, { movieId }), data);
  };

  delete = (movieId: number): Promise<EmptyResponse> => {
    return this.http.delete(this.buildUrl(this.api.MOVIE, { movieId }));
  };
}

export default Movies;
