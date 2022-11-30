import React from 'react';
import { GenericLayout } from './layouts/GenericLayout';
import { Dashboard } from './pages/common/Dashboard';
import { NotFound } from './pages/common/NotFound';

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
  DASHBOARD: {
    path: '/dashboard',
    permissions: [],
    layout: GenericLayout,
    component: Dashboard,
  },

  ERROR: {
    path: '/error',
    permissions: [],
    layout: GenericLayout,
    component: NotFound,
  },
});

export { RouteList };
