import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Global } from './components/Global';
import Routes from './pages/Routes';
import { Theme } from './theme';
import { AppProvider } from './AppContext';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <AppProvider>
        <Global />
        <Routes />
        <ToastContainer position={'bottom-left'} limit={3} />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
