import C from "chance"
import {
  getViewportHeight,
  getViewportWidth,
  kindDependent,
  orientationDependent
} from "../../../utils/util"
import {
  BOARD_LENGTH,
  LINE_LENGTH,
  PREVIEW_BOARD_LENGTH,
  PREVIEW_LINE_LENGTH
} from "./settings"

export const chance = () => new C()

export const getJoystickHeight = (joystickCollapsed: boolean) => {
  return joystickCollapsed ? 0 : kindDependent(150, 175)
}

export const getWallsHeight = () => {
  return 40 + 70
}

export const getWallsWidth = () => {
  return 60
}

function getPotentialBoxMaxWidth() {
  return Math.floor(
    orientationDependent(
      getViewportWidth(),
      (getViewportWidth() - getWallsWidth()) /
        (LINE_LENGTH + PREVIEW_LINE_LENGTH * 2)
    )
  )
}
function getPotentialBoxMaxHeight(joystickCollapsed: boolean) {
  return Math.floor(
    orientationDependent(
      (getViewportHeight() -
        getJoystickHeight(joystickCollapsed) -
        getWallsHeight()) /
        (BOARD_LENGTH + PREVIEW_BOARD_LENGTH),
      (getViewportHeight() - getJoystickHeight(joystickCollapsed)) /
        BOARD_LENGTH
    )
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
