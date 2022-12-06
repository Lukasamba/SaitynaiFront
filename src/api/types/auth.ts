export type EmptyResponse = [];

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
