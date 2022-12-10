import React from 'react';
import { GenericLayout } from './layouts/GenericLayout';
import { NotFound } from './pages/common/NotFound';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/auth/Login';
import { Movies } from './pages/common/Movies';
import { Halls } from './pages/common/Halls';
import { Divisions } from './pages/common/Divisions';
import { Register } from './pages/auth/Register';
import { Reservations } from './pages/common/Reservations';

export interface SiteRoute {
  readonly path: string;
  readonly component: React.FC<any> | React.ComponentClass<any>;
  readonly layout: React.FC<any> | React.ComponentClass<any>;
  readonly permissions: Array<string>;
}

export type RouteTree = { [key: string]: SiteRoute | RouteTree };

type RouteTreeProps<T> = {
  [K in keyof T]: T[K] extends RouteTree ? RouteTreeProps<T[K]> : T[K];
};

const createRouteTree = <T extends RouteTree>(item: T): RouteTreeProps<T> => {
  return item;
};

const RouteList = createRouteTree({
  MOVIES: {
    path: '/movies',
    permissions: [],
    layout: GenericLayout,
    component: Movies,
  },
  HALLS: {
    path: '/halls',
    permissions: [],
    layout: GenericLayout,
    component: Halls,
  },
  DIVISIONS: {
    path: '/divisions',
    permissions: [],
    layout: GenericLayout,
    component: Divisions,
  },
  RESERVATION: {
    path: '/reservations',
    permissions: [],
    layout: GenericLayout,
    component: Reservations,
  },
  AUTH: {
    LOGIN: {
      path: '/login',
      permissions: [],
      layout: AuthLayout,
      component: Login,
    },
    REGISTER: {
      path: '/register',
      permissions: [],
      layout: AuthLayout,
      component: Register,
    },
  },
  ERROR: {
    path: '/error',
    permissions: [],
    layout: GenericLayout,
    component: NotFound,
  },
});

export { RouteList };
