export interface MoviesListResponse {
  id: string;
  name: string;
  genre: string;
  length: string;
  image_url: string;
}

export interface MovieCreateRequest {
  name: string;
  genre: string;
  length: string;
  image_url: string;
}
