import React, { createContext, useContext, useState } from 'react';
import { ReactFCWithChildren } from './react-app-env';
import { DataStorage } from './services/dataStorage';

interface AppContextProps {
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextProps>(undefined as any);

const AppProvider: ReactFCWithChildren = (props) => {
  const [jwt, setJwt] = useState<string | null>(DataStorage.get('jwt'));

  return <AppContext.Provider value={{ jwt, setJwt }}>{props.children}</AppContext.Provider>;
};

const useAppContext = (): AppContextProps => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
