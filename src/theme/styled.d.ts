import 'styled-components/native';
import { theme } from './theme';

declare module 'styled-components/native' {
  type ThemeType = typeof theme.light;
  export interface DefaultTheme extends ThemeType {}
}