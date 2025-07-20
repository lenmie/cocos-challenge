export const colors = {
  primary: '#243010',
  secondary: '#A1C349',
  tertiary: '#CAD593',
  quaternary: '#2A3C24',
};

export const theme = {
  light: {
    background: colors.tertiary,
    text: colors.primary,
    primary: colors.primary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    quaternary: colors.quaternary,
  },
  dark: {
    background: colors.primary,
    text: colors.tertiary,
    primary: colors.secondary,
    secondary: colors.primary,
    tertiary: colors.quaternary,
    quaternary: colors.tertiary,
  },
};

export type DarkTheme = typeof theme.dark;
export type LightTheme = typeof theme.light;
export type Theme = DarkTheme | LightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
