import React from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { RouteList } from '../../routeList';
import { useAppContext } from '../../AppContext';

interface Props {
  component: React.FC<any> | React.ComponentClass<any>;
  layout: React.FC<any> | React.ComponentClass<any>;
  permissions: Array<string>;
}

const AuthPage: React.FC<Props> = ({ component: Component, layout: Layout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const appContext = useAppContext();

  const isInAnyAuthPage = () => {
    return Object.values(RouteList.AUTH).find((value) => matchPath(value.path, pathname));
  };

  if (!appContext.jwt && !isInAnyAuthPage()) {
    navigate(RouteList.AUTH.LOGIN.path);
  }

  if (appContext.jwt && isInAnyAuthPage()) {
    navigate(RouteList.MOVIES.path);
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
};
export default AuthPage;
