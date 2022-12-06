import Client from '../client';
import Http from '../../http';
import { EmptyResponse, LoginRequest, LoginUserResponse, RegisterRequest } from '../../types/auth';

class Auth extends Client {
  constructor(http: Http) {
    super(http);

    this.api = {
      LOGIN: `${this.http.baseUrl}/auth/login`,
      REGISTER: `${this.http.baseUrl}/auth/register`,
      LOGOUT: `${this.http.baseUrl}/auth/logout`,
    };
  }

  login = (data: LoginRequest): Promise<LoginUserResponse> => {
    return this.http.post(this.api.LOGIN, data);
  };

  register = (data: RegisterRequest): Promise<EmptyResponse> => {
    return this.http.post(this.api.REGISTER, data);
  };

  logout = (): Promise<EmptyResponse> => {
    return this.http.post(this.api.LOGOUT);
  };
}

export default Auth;
