import Http from './http';
import UserAuth from './services/user/auth';

export const http = new Http();
export { http as Http };

export const Api = {
  user: {
    auth: new UserAuth(http),
  },
};
