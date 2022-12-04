import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Subject } from 'rxjs';
import { DataStorage } from '../services/dataStorage';

export interface HttpError {
  message: string;
  response: AxiosResponse<any>;
  status: number;
}

class Http {
  axios: AxiosInstance;
  errorObserver: Subject<HttpError>;
  post: AxiosInstance['post'];
  get: AxiosInstance['get'];
  put: AxiosInstance['put'];
  delete: AxiosInstance['delete'];

  baseUrl = 'https://pure-chamber-22146.herokuapp.com/api';

  session: Subject<Date>;

  constructor() {
    this.errorObserver = new Subject<HttpError>();
    this.session = new Subject<Date>();

    const defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Expose-Headers': 'Access-Control-*',
      'Access-Control-Allow-Headers':
        'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
      'Access-Control-Allow-Origin': '*',
      Allow: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
      crossdomain: true,
    };
    const jwt = DataStorage.get('jwt');

    this.axios = axios.create({
      withCredentials: true,
      headers: defaultHeaders,
    });

    if (!!jwt) {
      this.setBearer(jwt);
    }

    this.post = this.axios.post;
    this.get = this.axios.get;
    this.put = this.axios.put;
    this.delete = this.axios.delete;

    this.axios.interceptors.request.use((request) => {
      this.setBearer(DataStorage.get('jwt'));
      return request;
    });
    this.axios.interceptors.response.use((response: AxiosResponse) => {
      return response.data;
    });
  }

  setBearer(accessToken: string | null): void {
    this.axios.defaults.headers.common = {
      ...this.axios.defaults.headers.common,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // removeBearer(): void {
  //   this.axios.defaults.headers.common = {
  //     ...this.axios.defaults.headers.common,
  //     Authorization: '',
  //   };
  // }
}

export default Http;
