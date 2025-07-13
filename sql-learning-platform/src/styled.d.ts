import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      accent: string;
      success: string;
      warning: string;
      error: string;
      text: string;
      textSecondary: string;
      border: string;
      hover: string;
    };
    fonts: {
      mono: string;
      sans: string;
    };
    shadows: {
      glow: string;
      card: string;
    };
  }
}