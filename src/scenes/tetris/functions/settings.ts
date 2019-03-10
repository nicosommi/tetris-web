import { isDebug } from "../../../utils/debug"

export const BOX_WIDTH = isDebug() ? 44 : 24
export const BOX_HEIGHT = 24
export const LINE_LENGTH = 10
export const PREVIEW_BOARD_LENGTH = 2
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

const prefixUrl = process.env.PUBLIC_URL

export const TETROMINO_THEME: Theme = {
  fontFamily: "sans-serif",
  music: `${prefixUrl}/assets/music/01.mp3`,
  name: "default",
  shapeColors: {
    i: "maroon",
    j: "silver",
    l: "purple",
    o: "navy",
    s: "green",
    t: "brown",
    z: "teal"
  },
  sounds: {
    lineEat: `${prefixUrl}/assets/sound/tetris-effects-line-eat-1x.mp3`
  }
}

export const GAMEBOY_THEME: Theme = {
  fontFamily: "sans-serif",
  music: `${prefixUrl}/assets/music/01.mp3`,
  name: "gameboy",
  shapeColors: {
    i: "orange",
    j: "cyan",
    l: "red",
    o: "yellow",
    s: "#ff00ff",
    t: "green",
    z: "#ffbf00"
  },
  sounds: {
    lineEat: `${prefixUrl}/assets/sound/tetris-effects-line-eat-1x.mp3`
  }
}
export const RED_THEME: Theme = {
  fontFamily: "sans-serif",
  music: `${prefixUrl}/assets/music/01.mp3`,
  name: "red",
  shapeColors: {
    i: "red",
    j: "red",
    l: "red",
    o: "red",
    s: "red",
    t: "red",
    z: "red"
  },
  sounds: {
    lineEat: `${prefixUrl}/assets/sound/tetris-effects-line-eat-1x.mp3`
  }
}

export const themes: Theme[] = [TETROMINO_THEME, GAMEBOY_THEME, RED_THEME]
