export const Theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    gray: '#898989',
    purple1: '#6C4AB6',
    purple2: '#8D72E1',
    blue1: '#8D9EFF',
    blue2: '#B9E0FF',
  },
  typography: {
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: '0.75rem',
  },
  boxShadow: '0 0 0.625rem rgba(0, 0, 0, 0.15)',
};

export type ThemeType = typeof Theme;
