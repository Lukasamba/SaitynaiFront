import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Global } from './components/Global';
import Routes from './pages/Routes';
import { Theme } from './theme';
import { AppProvider } from './AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api, http } from './api';
import { DataStorage } from './services/dataStorage';

const App: React.FC = () => {
  useEffect(() => {
    if (DataStorage.get('jwt')) {
      (async () => {
        const response = await Api.user.auth.refresh();

        if (response.access_token) {
          http.setBearer(response.access_token);
          DataStorage.set('jwt', response.access_token);
        }
      })();
    }
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <AppProvider>
        <Global />
        <Routes />
        <ToastContainer position="bottom-left" />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
