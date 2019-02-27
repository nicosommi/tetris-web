import C from "chance"
import { Dimensions } from "react-native"
import { isWeb } from "../../../utils/debug"
import { BOARD_LENGTH, BOX_WIDTH, LINE_LENGTH } from "./settings"

export const chance = () => new C()

export const getJoystickHeight = (joystickCollapsed: boolean) => {
  return joystickCollapsed ? 60 : 200
}

export const getViewportWidth = () =>
  isWeb()
    ? document.documentElement.clientWidth
    : Dimensions.get("window").width
export const getViewportHeight = () =>
  isWeb()
    ? document.documentElement.clientHeight
    : Dimensions.get("window").height

function getPotentialBoxMaxWidth() {
  return Math.floor(getViewportWidth() / LINE_LENGTH)
}
function getPotentialBoxMaxHeight(joystickCollapsed: boolean) {
  return Math.floor(
    (getViewportHeight() - getJoystickHeight(joystickCollapsed)) / BOARD_LENGTH
  )
}

export function getBoxMaxSide(joystickCollapsed: boolean) {
  return Math.min(
    getPotentialBoxMaxHeight(joystickCollapsed),
    getPotentialBoxMaxWidth()
  )
}

export const getBoardWidth = (joystickCollapsed: boolean): number => {
  return getBoxMaxSide(joystickCollapsed) * LINE_LENGTH
}

export const getBoardHeight = (joystickCollapsed: boolean): number => {
  return getBoxMaxSide(joystickCollapsed) * BOARD_LENGTH
}
