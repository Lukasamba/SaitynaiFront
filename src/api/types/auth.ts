export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  access_token: string;
  token_type: string;
}
