import C from "chance"
import { Dimensions } from "react-native"
import { BOARD_LENGTH, LINE_LENGTH, PREVIEW_LINE_LENGTH } from "./settings"

export const chance = () => new C()

export const getJoystickHeight = (joystickCollapsed: boolean) => {
  return joystickCollapsed ? 0 : 175
}

export const getViewportWidth = () => Dimensions.get("window").width
export const getViewportHeight = () => Dimensions.get("window").height

function getPotentialBoxMaxWidth() {
  return Math.floor(
    (getViewportWidth() - 50) / (LINE_LENGTH + PREVIEW_LINE_LENGTH * 2)
  )
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
