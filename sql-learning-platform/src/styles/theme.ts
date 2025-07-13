import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  colors: {
    background: '#0d1117',
    primary: '#161b22',
    secondary: '#21262d',
    accent: '#58a6ff',
    success: '#238636',
    warning: '#d29922',
    error: '#f85149',
    text: '#f0f6fc',
    textSecondary: '#8b949e',
    border: '#30363d',
    hover: '#262c36'
  },
  fonts: {
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
  },
  shadows: {
    glow: '0 0 15px rgba(88, 166, 255, 0.3)',
    card: '0 4px 16px rgba(0, 0, 0, 0.4)'
  }
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.sans};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.accent}dd;
  }
`;