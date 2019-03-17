import C from "chance"
import { getViewportHeight, getViewportWidth } from "../../../utils/util"
import { BOARD_LENGTH, LINE_LENGTH, PREVIEW_LINE_LENGTH } from "./settings"

export const chance = () => new C()

export const getJoystickHeight = (joystickCollapsed: boolean) => {
  return joystickCollapsed ? 0 : 175
}

function getPotentialBoxMaxWidth() {
  return Math.floor(
    (getViewportWidth() - 100) / (LINE_LENGTH + PREVIEW_LINE_LENGTH * 2)
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
