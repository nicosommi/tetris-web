import { isDebug } from "../../../utils/debug"

export const BOX_WIDTH = isDebug() ? 44 : 24
export const BOX_HEIGHT = 24
export const LINE_LENGTH = 10
export const PREVIEW_LINE_LENGTH = 4
export const BOARD_LENGTH = 24
export const SHAPE_QUEUE_LENGTH = 3
export const GAME_THICK_INTERVAL = 750
export const GAME_ROTATION_DIRECTION: "clockwise" | "counterclockwise" =
  "clockwise"

export const GAME_COMMANDS: GameCommands = {
  action: "Enter",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight"
}

export const TETROMINO_THEME: Theme = {
  name: "default",
  shapeColors: {
    i: "maroon",
    j: "silver",
    l: "purple",
    o: "navy",
    s: "green",
    t: "brown",
    z: "teal"
  }
}

export const GAMEBOY_THEME: Theme = {
  name: "gameboy",
  shapeColors: {
    i: "orange",
    j: "cyan",
    l: "red",
    o: "yellow",
    s: "Magenta", // buggy
    t: "green",
    z: "amber" // buggy
  }
}
export const RED_THEME: Theme = {
  name: "red",
  shapeColors: {
    i: "red",
    j: "red",
    l: "red",
    o: "red",
    s: "red",
    t: "red",
    z: "red"
  }
}

export const themes: Theme[] = [TETROMINO_THEME, GAMEBOY_THEME, RED_THEME]