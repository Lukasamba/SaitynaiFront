import React, { useEffect } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { RouteList } from '../../routeList';
import { useAppContext } from '../../AppContext';
import { DataStorage } from '../../services/dataStorage';
import useRoles, { Roles } from '../../helpers/helpers';

interface Props {
  component: React.FC<any> | React.ComponentClass<any>;
  layout: React.FC<any> | React.ComponentClass<any>;
  permissions: Array<string>;
}

const AuthPage: React.FC<Props> = ({ component: Component, layout: Layout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const remoteRoles = useRoles();
  const isAdmin = () => {
    return remoteRoles.hasAny(Roles.Admin);
  };
  const isManager = () => {
    return remoteRoles.hasAny(Roles.Manager);
  };

  const appContext = useAppContext();

  const isInAnyAuthPage = () => {
    return Object.values(RouteList.AUTH).find((value) => matchPath(value.path, pathname));
  };

  const isInMoviesPage = () => {
    return matchPath(RouteList.MOVIES.path, pathname);
  };

  const isInHallsPage = () => {
    return matchPath(RouteList.HALLS.path, pathname);
  };

  const isInDivisionsPage = () => {
    return matchPath(RouteList.DIVISIONS.path, pathname);
  };

  useEffect(() => {
    appContext.jwt != DataStorage.get('jwt') && appContext.setJwt(DataStorage.get('jwt'));

    if (!appContext.jwt && !isInAnyAuthPage() && !isInMoviesPage()) {
      navigate(RouteList.AUTH.LOGIN.path);
    }

    if (appContext.jwt && isInAnyAuthPage()) {
      navigate('/');
    }

    if (!isManager() && isInHallsPage()) {
      navigate('/');
    }

    if (!isAdmin() && isInDivisionsPage()) {
      navigate('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext, DataStorage.get('jwt')]);

  return (
    <Layout>
      <Component />
    </Layout>
  );
};
export default AuthPage;
