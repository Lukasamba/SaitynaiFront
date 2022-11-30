import React from 'react';
import { Location as RouterLocation, Location } from 'history';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  children: React.FunctionComponent<{
    history: {
      replace(location: Location): void;
      push(location: Location): void;
    };
    location: RouterLocation;
  }>;
}

const RouteAdapter: React.FunctionComponent<Props> = ({ children }) => {
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location: Location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location: Location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate],
  );
  if (!children) {
    return null;
  }
  return children({ history: adaptedHistory, location: routerLocation });
};

export default RouteAdapter;
