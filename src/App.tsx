import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Global } from './components/Global';
import Routes from './pages/Routes';
import { Theme } from './theme';
import { AppProvider } from './AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
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
