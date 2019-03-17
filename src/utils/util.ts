import { Dimensions } from "react-native"

export const getViewportWidth = () => Dimensions.get("window").width
export const getViewportHeight = () => Dimensions.get("window").height

export function orientationDependent<T>(portrait: T, landscape: T): T {
  return getViewportWidth() < getViewportHeight() ? portrait : landscape
}

export const kindDependent = orientationDependent
