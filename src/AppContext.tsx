import React, { createContext, useContext, useState } from 'react';
import { ReactFCWithChildren } from './react-app-env';

interface AppContextProps {
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps>(undefined as any);

const AppProvider: ReactFCWithChildren = (props) => {
  const [jwt, setJwt] = useState<string>('');

  return <AppContext.Provider value={{ jwt, setJwt }}>{props.children}</AppContext.Provider>;
};

const useAppContext = (): AppContextProps => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
