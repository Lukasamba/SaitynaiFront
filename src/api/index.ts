import Http from './http';
import UserAuth from './services/user/auth';
import Movies from './services/movies/movies';
import Halls from './services/halls/halls';
import Divisions from './services/divisions/divisions';

export const http = new Http();
export { http as Http };

export const Api = {
  user: {
    auth: new UserAuth(http),
  },
  movies: new Movies(http),
  halls: new Halls(http),
  divisions: new Divisions(http),
};
