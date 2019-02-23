import { Platform } from "react-native"
import { React } from "../utils/view"

const location =
  typeof window !== "undefined" ? window.location : { search: "" }

export function isDebug() {
  return isWeb() ? location.search.indexOf("?debug") === 0 : false
}

export function isWeb() {
  return Platform.OS === "web"
}

export const DebugContext = React.createContext(isDebug())
