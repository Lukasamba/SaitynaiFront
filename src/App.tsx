import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Global } from './components/Global';
import Routes from './pages/Routes';
import { Theme } from './theme';
import { AppProvider } from './AppContext';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <AppProvider>
        <Global />
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
