import C from "chance"
import { Dimensions } from "react-native"
import { isWeb } from "../../../utils/debug"
import { BOARD_LENGTH, BOX_WIDTH, LINE_LENGTH } from "./settings"

export const chance = () => new C()

export const getViewportWidth = () =>
  0.8 *
  (isWeb()
    ? document.documentElement.clientWidth
    : Dimensions.get("window").width)
export const getViewportHeight = () =>
  0.8 *
  (isWeb()
    ? document.documentElement.clientHeight
    : Dimensions.get("window").height)

function getPotentialBoxMaxWidth() {
  return Math.floor(getViewportWidth() / LINE_LENGTH)
}
function getPotentialBoxMaxHeight() {
  return Math.floor(getViewportHeight() / BOARD_LENGTH)
}

export function getBoxMaxSide() {
  return Math.min(getPotentialBoxMaxHeight(), getPotentialBoxMaxWidth())
}

export const getBoardWidth = (): number => {
  return getBoxMaxSide() * LINE_LENGTH
}

export const getBoardHeight = (): number => {
  return getBoxMaxSide() * BOARD_LENGTH
}
