export interface MovieCreateRequest {
  name: string;
  genre: string;
  length: string;
  image_url: string;
}

export interface MovieUpdateRequest {
  name: string;
  genre: string;
  length: string;
  image_url: string;
}

export interface MovieResponse {
  id: number;
  name: string;
  genre: string;
  length: string;
  image_url: string;
}

export type MoviesListResponse = MovieResponse[];
