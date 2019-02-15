import { React } from "../../../utils/view"

import { Reducer } from "react"
import { createBoard, drawBoardLines, simplifyLines } from "./board"
import { createGame, getLevelForLines, getTickForLevel } from "./game"
import { useKeyDowns } from "./keyboard"
import { GAME_THICK_INTERVAL } from "./settings"
import {
  doesShapeCollidesWithFilledBoxAtSide,
  doesShapeCollidesWithFilledBoxInCurrentPosition,
  getNextPosition,
  prepareQueue
} from "./shape"

const { useReducer, useEffect, useLayoutEffect, useState, useRef } = React

const initialGame: Game = createGame()

const reduceGame: GameReducer = (previous, action) => {
  if (previous.gameOver === true && action.type !== "RESTART") return previous
  if (previous.paused && action.type !== "PAUSE") return previous
  switch (action.type) {
    case "PAUSE": {
      return {
        ...previous,
        paused: !previous.paused
      }
    }
    case "DOWN":
    case "THICK": {
      const [newShapeQueue, oneForNow] = prepareQueue(previous.board)
      const collidesOneForNow = doesShapeCollidesWithFilledBoxAtSide(
        previous.board,
        oneForNow,
        "bottom"
      )
      let activeShape = previous.board.activeShape
      let useOneForNow = false
      if (activeShape) {
        const collidesActive = activeShape
          ? doesShapeCollidesWithFilledBoxAtSide(
              previous.board,
              activeShape,
              "bottom"
            )
          : false
        if (!collidesActive) {
          activeShape = { ...activeShape, line: activeShape.line - 1 }
        } else {
          activeShape = undefined
        }
      } else {
        activeShape = !collidesOneForNow ? oneForNow : undefined
        useOneForNow = activeShape ? activeShape.id === oneForNow.id : false
      }
      const finalShapeQueue = useOneForNow
        ? newShapeQueue
        : [oneForNow, ...newShapeQueue.slice(0, newShapeQueue.length)]
      const [newBoardLines, newLines] = simplifyLines(previous.board)
      const lines = previous.lines + newLines
      const level = getLevelForLines(lines)

      return {
        ...previous,
        board: {
          ...previous.board,
          activeShape,
          lines: drawBoardLines(newBoardLines, activeShape),
          previewBoards: finalShapeQueue.map(currentShape => {
            const board = createBoard(4, 4)
            const adaptedShape: Shape = {
              ...currentShape,
              column: 0,
              line: 1
            }
            return {
              ...board,
              lines: drawBoardLines(board.lines, adaptedShape)
            }
          }),
          shapeQueue: finalShapeQueue
        },
        endDate:
          activeShape === undefined && collidesOneForNow
            ? new Date()
            : undefined,
        gameOver: activeShape === undefined && collidesOneForNow ? true : false,
        level,
        lines,
        startDate: previous.ticks === 0 ? new Date() : previous.startDate,
        ticks: action.payload ? Number(action.payload) : previous.ticks
      }
    }
    case "BLAST": {
      // TODO: implement command
      return previous
    }
    case "LEFT": {
      if (!previous.board.activeShape) {
        return previous
      }
      const activeShape = {
        ...previous.board.activeShape,
        column: !doesShapeCollidesWithFilledBoxAtSide(
          previous.board,
          previous.board.activeShape,
          "left"
        )
          ? previous.board.activeShape.column - 1
          : previous.board.activeShape.column
      }
      return {
        ...previous,
        board: {
          ...previous.board,
          activeShape,
          lines: drawBoardLines(previous.board.lines, activeShape)
        }
      }
    }
    case "RIGHT": {
      if (!previous.board.activeShape) {
        return previous
      }
      const activeShape = {
        ...previous.board.activeShape,
        column: !doesShapeCollidesWithFilledBoxAtSide(
          previous.board,
          previous.board.activeShape,
          "right"
        )
          ? previous.board.activeShape.column + 1
          : previous.board.activeShape.column
      }
      return {
        ...previous,
        board: {
          ...previous.board,
          activeShape,
          lines: drawBoardLines(previous.board.lines, activeShape)
        }
      }
    }
    case "ROTATE": {
      // rotation strategy as setting? axis place on the shape
      if (!previous.board.activeShape) {
        return previous
      }
      const activeShape = {
        ...previous.board.activeShape,
        // FIXME: add extra logic to rotate adjusting absolute coordinates so it feels correct
        // FIXME: add extra logic for shapes at the sides
        position: getNextPosition(previous.board.activeShape.position)
      }
      const collides = doesShapeCollidesWithFilledBoxInCurrentPosition(
        previous.board,
        activeShape
      )
      if (collides) {
        return previous
      }
      // get shape width for this new on all lines or not off board
      // if width > available on some line
      // if intersection, adjust to most closest...
      return {
        ...previous,
        board: {
          ...previous.board,
          activeShape,
          lines: drawBoardLines(previous.board.lines, activeShape)
        }
      }
    }
    case "RESTART": {
      // console.log("unknown action", { action })
      return createGame(previous)
    }
    default: {
      // console.log("unknown action", { action })
      return previous
    }
  }
}

const useTick = (
  dispatchTick: (t: number) => void,
  getInterval: () => number,
  props: Array<unknown>,
  shouldUseLayoutEffect: boolean = false
) => {
  let tickCount = 0
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cb = () => {
    dispatchTick(++tickCount)
    timeoutRef.current = setTimeout(() => callbackRef.current(), getInterval())
  }

  const callbackRef = useRef<() => void>(cb)

  useEffect(() => {
    callbackRef.current = cb
  })

  let effectFunction = useEffect
  if (shouldUseLayoutEffect) {
    effectFunction = useLayoutEffect
  }
  effectFunction(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), getInterval())
    return () =>
      timeoutRef.current ? clearTimeout(timeoutRef.current) : undefined
  }, props)
}

type CommandHandler = (_?: string, e?: KeyboardEvent) => void

type Commands = { [key in ActionType]: CommandHandler }

type CommandCreator = (dispatch: React.Dispatch<Action>) => Commands

const createHandler = (
  type: ActionType,
  dispatch: React.Dispatch<Action>
): CommandHandler => (_: unknown = {}, e = undefined) => {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault()
  } // avoid scroll
  dispatch({ type })
}

const createHandlers: CommandCreator = d => ({
  BLAST: createHandler("BLAST", d),
  DOWN: createHandler("DOWN", d),
  LEFT: createHandler("LEFT", d),
  PAUSE: createHandler("PAUSE", d),
  RESTART: createHandler("RESTART", d),
  RIGHT: createHandler("RIGHT", d),
  ROTATE: createHandler("ROTATE", d),
  THICK: createHandler("THICK", d)
})

export function useTetris(): [Game, number, Commands] {
  const [game, dispatch] = useReducer<Reducer<Game, Action>, Game>(
    reduceGame,
    initialGame,
    () => initialGame
  )

  useTick(
    t => dispatch({ type: "THICK", payload: t }),
    () => getTickForLevel(game.level),
    [game.level]
  )

  const handlers = createHandlers(dispatch)

  useKeyDowns([
    {
      handler: handlers.ROTATE,
      keys: ["Enter", "ArrowUp"]
    },
    {
      handler: handlers.RIGHT,
      keys: ["ArrowRight"]
    },
    {
      handler: handlers.LEFT,
      keys: ["ArrowLeft"]
    },
    {
      handler: handlers.DOWN,
      keys: ["ArrowDown", " "]
    },
    {
      handler: handlers.RESTART,
      keys: ["r"]
    },
    {
      handler: handlers.PAUSE,
      keys: ["p"]
    }
  ])

  const [duration, setDuration] = useState(0)
  useTick(
    () => {
      const newDuration =
        game.endDate && game.startDate
          ? Math.floor(
              (game.endDate.getTime() - game.startDate.getTime()) / 1000
            )
          : game.startDate
          ? Math.floor((new Date().getTime() - game.startDate.getTime()) / 1000)
          : 0
      if (!game.paused) setDuration(newDuration)
    },
    () => 250,
    [game.startDate, game.endDate, game.paused]
  )

  return [game, duration, handlers]
}
