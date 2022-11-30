import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Global } from './components/Global';
import Routes from './pages/Routes';
import { Theme } from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Global />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
