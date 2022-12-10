import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (!appContext.jwt && !isInAnyAuthPage()) {
      navigate(RouteList.AUTH.LOGIN.path);
    }

    if (appContext.jwt && isInAnyAuthPage()) {
      navigate(RouteList.ERROR.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext]);

  return (
    <Layout>
      <Component />
    </Layout>
  );
};
export default AuthPage;
