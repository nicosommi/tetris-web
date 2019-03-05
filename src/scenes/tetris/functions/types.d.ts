type CommandHandler = (_?: string, e?: KeyboardEvent) => void

type Commands = { [key in ActionType]: CommandHandler }

type JoystickButtonType =
  | "up"
  | "down"
  | "left"
  | "right"
  | "x"
  | "y"
  | "start"
  | "select"

type JoystickCommands = { [key in JoystickButtonType]: CommandHandler }

type CommandCreator = (dispatch: React.Dispatch<Action>) => Commands

type Identificable = {
  id: string
}

type Point = { x: number; y: number }

type ShapeType = "o" | "i" | "s" | "z" | "l" | "j" | "t"
type ShapePosition = 0 | 1 | 2 | 3
// is Partial<T> a substitution for all cases for this Identificable scenario?
// pro: two well defined types vs less code and more flexibility
type AnonymousShape = {
  type: ShapeType
  position: ShapePosition
  line: number
  column: number
}
type Shape = AnonymousShape & Identificable

type AnonymousShapePart = {
  shape: Shape
  order: number
} & Identificable
type ShapePart = AnonymousShapePart & Identificable

type AnonymousBox = {
  partOfShape?: ShapePart
} & Identificable
type Box = AnonymousBox & Identificable

type Line = Box[]

type AnonymousBoard = {
  lines: Line[]
  activeShape?: Shape
  shapeQueue: Shape[]
  previewBoards: Board[]
} & Identificable
type Board = AnonymousBoard & Identificable

type AnonymousGame = {
  board: Board
  score: number
  lines: number
  level: number
  previous?: Game
  ticks: number
  gameOver: boolean
  startDate?: Date
  lastEatenLines: number
  durationInSeconds: number
  endDate?: Date
  paused: boolean
} & Identificable
type Game = AnonymousGame & Identificable

type ActionType =
  | "TICK"
  | "LEFT"
  | "RIGHT"
  | "DOWN"
  | "ROTATE"
  | "BLAST"
  | "RESTART"
  | "PAUSE"
  | "SECOND"
type Action<T = any> = {
  type: ActionType
  payload?: T
}

type GameReducer = (previous: Game, newOne: Action<unknown>) => Game

type ShapeCoordinates = { [key in ShapeType]: Point[] }

type ShapeAllPositionCoordinates = {
  [0]: ShapeCoordinates
  [1]: ShapeCoordinates
  [2]: ShapeCoordinates
  [3]: ShapeCoordinates
}

type ThemeNames =
  | "default"
  | "gameboy"
  | "microsoft"
  | "plus"
  | "vadim"
  | "sega"
  | "red"
type Theme = {
  name: ThemeNames
  fontFamily: string
  shapeColors: { [key in ShapeType]: string }
}

type GameCommands = {
  [key in "left" | "right" | "down" | "action"]: string | string[]
}

type KeyCodeHandler = {
  keys: string[]
  handler: (key: string, event: KeyboardEvent) => void
}

type UseKeyDownsArgs = KeyCodeHandler[]

type XsByXs = { [key: string]: number[] }

type Side = "right" | "left" | "top" | "bottom"
