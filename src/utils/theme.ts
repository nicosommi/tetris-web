import { ThemeProvider } from "emotion-theming"
import { React } from "./view"

import { themes } from "../scenes/tetris/functions/settings"

export function getThemeByName(theme: ThemeNames = "default"): Theme {
  return themes.find(t => t.name === theme) || themes[0]
}

export const ThemeContext = React.createContext<Theme>(getThemeByName())

export const EmotionThemeProvider = ThemeProvider
