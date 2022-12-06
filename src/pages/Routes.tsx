import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteList, RouteTree, SiteRoute } from '../routeList';
import { AuthPage } from '../components/Auth';

const AppRoutes: React.FC = () => {
  const iterateRoutes: any = (routeTree: RouteTree) => {
    const routes = [];

    for (const item in routeTree) {
      const currentRouteTree = routeTree[item];

      if (
        currentRouteTree.path == undefined ||
        currentRouteTree.layout == undefined ||
        currentRouteTree.component == undefined ||
        currentRouteTree.permissions == undefined
      ) {
        routes.push(...iterateRoutes(currentRouteTree as RouteTree));
      } else {
        const siteRoute = currentRouteTree as SiteRoute;

        const route = (
          <Route path={siteRoute.path} key={siteRoute.path} element={<AuthPage {...siteRoute} />} />
        );
        routes.push(route);
      }
    }
    return routes;
  };

  return (
    <Routes>
      <Route path={'/'} element={<Navigate replace to={RouteList.MOVIES.path} />} />
      {iterateRoutes(RouteList)}
      <Route path={'*'} element={<Navigate replace to={RouteList.ERROR.path} />} />
    </Routes>
  );
};

export default AppRoutes;
