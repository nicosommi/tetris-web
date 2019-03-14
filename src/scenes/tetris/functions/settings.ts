import { isDebug } from "../../../utils/debug"

export const BOX_WIDTH = isDebug() ? 44 : 24
export const BOX_HEIGHT = 24
export const LINE_LENGTH = 10
export const PREVIEW_BOARD_LENGTH = 2
export const PREVIEW_LINE_LENGTH = 4
export const BOARD_LENGTH = 24
export const SHAPE_QUEUE_LENGTH = 4
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
  box: {
    backgroundColor: "#051e3e",
    borderColor: "rgba(255,255,255,.2)"
  },
  color: "#ffffff",
  fontFamily: "sans-serif",
  music: `${prefixUrl}/assets/music/01.mp3`,
  name: "default",
  panel: {
    backgroundColor: "#651e3e",
    borderColor: "#000000"
  },
  shapeBox: {
    borderColor: "rgba(255,255,255,.2)",
    borderWidth: 1
  },
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
  },
  wall: {
    backgroundColor: "#251e3e",
    borderColor: "#851e3e",
    borderWidth: 15,
    secondaryBorderColor: "#ffffff"
  }
}

export const GAMEBOY_THEME: Theme = {
  box: {
    backgroundColor: "rgb(234, 255, 211)",
    borderColor: "rgba(0,0,0,.2)"
  },
  color: "#ffffff",
  fontFamily: "sans-serif",
  music: `${prefixUrl}/assets/music/01.mp3`,
  name: "gameboy",
  panel: {
    backgroundColor: "rgb(28, 50, 60)",
    borderColor: "#000000"
  },
  shapeBox: {
    borderColor: "rgba(0,0,0,.6)",
    borderWidth: 1
  },
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
  },
  wall: {
    backgroundColor: "rgb(170, 210, 170)",
    borderColor: "rgb(234, 255, 211)",
    borderWidth: 15
  }
}
export const RED_THEME: Theme = {
  box: {
    backgroundColor: "#ffffff",
    borderColor: "rgba(0,0,0,.2)"
  },
  color: "#000000",
  fontFamily: "sans-serif",
  music: `${prefixUrl}/assets/music/01.mp3`,
  name: "red",
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#000000"
  },
  shapeBox: {
    borderColor: "rgba(255,255,255,.2)",
    borderWidth: 1
  },
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
  },
  wall: {
    backgroundColor: "#ffffff",
    borderColor: "#ff0000",
    borderWidth: 15
  }
}

export const themes: Theme[] = [TETROMINO_THEME, GAMEBOY_THEME, RED_THEME]
