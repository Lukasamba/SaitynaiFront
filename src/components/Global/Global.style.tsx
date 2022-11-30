import { createGlobalStyle, css } from 'styled-components';
import { ThemeType } from '../../theme';

const bootstrapCss = css`
  ${require('bootstrap/dist/css/bootstrap.css')}
`;

const ubuntuFontCss = css`
  ${require('@fontsource/ubuntu')}
`;

export const Global = createGlobalStyle<{ theme: ThemeType }>`
  ${bootstrapCss}
  ${ubuntuFontCss}

  //TODO styled-components skips first brackets for some reason
  {
  }

  html, body, div#root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.typography.fontFamily} !important;
    font-size: ${({ theme }) => theme.typography.fontSize};
  }
`;
