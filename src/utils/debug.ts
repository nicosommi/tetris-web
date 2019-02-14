import { React } from "../utils/view"

const location =
  typeof window !== "undefined" ? window.location : { search: "" }

export function isDebug() {
  return location.search.indexOf("?debug") === 0
}

export const DebugContext = React.createContext(isDebug())
