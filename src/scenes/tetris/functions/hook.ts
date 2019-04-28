import { React } from "../../../utils/view"

import { Reducer } from "react"
import { createBoard, drawBoardLines, simplifyLines } from "./board"
import { createGame, getLevelForLines, getTickForLevel } from "./game"
import { PREVIEW_BOARD_LENGTH, PREVIEW_LINE_LENGTH } from "./settings"
import {
  doesShapeCollidesWithFilledBoxAtSide,
  doesShapeCollidesWithFilledBoxInCurrentPosition,
  getNextPosition,
  prepareQueue
} from "./shape"

const { useReducer, useEffect, useLayoutEffect, useState, useRef } = React

const initialGame: Game = createGame()

const reduceGame: GameReducer = (previous, action): Game => {
  if (!previous.startDate && action.type !== "START") return previous
  if (
    previous.gameOver === true &&
    action.type !== "RESTART" &&
    action.type !== "PAUSE"
  )
    return previous
  if (previous.paused && action.type !== "PAUSE" && action.type !== "RESTART")
    return previous
  switch (action.type) {
    case "START": {
      const startDate = previous.ticks === 0 ? new Date() : previous.startDate
      return { ...previous, startDate }
    }
    case "SECOND": {
      const durationInSeconds = previous.paused
        ? previous.durationInSeconds
        : previous.durationInSeconds + Number(action.payload)
      return {
        ...previous,
        durationInSeconds
      }
    }
    case "PAUSE": {
      const paused = !previous.paused
      return {
        ...previous,
        paused
      }
    }
    case "DOWN":
    case "TICK": {
      const [newShapeQueue, oneForNow] = prepareQueue(previous.board)
      const collidesOneForNow = doesShapeCollidesWithFilledBoxAtSide(
        previous.board,
        oneForNow,
        "bottom"
      )
      let activeShape = previous.board.activeShape
      let useOneForNow = false
      let newBoardLines = previous.board.lines
      let newLines = 0
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
          ;[newBoardLines, newLines] = simplifyLines(previous.board)
        }
      } else {
        activeShape = !collidesOneForNow ? oneForNow : undefined
        useOneForNow = activeShape ? activeShape.id === oneForNow.id : false
      }
      const finalShapeQueue = useOneForNow
        ? newShapeQueue
        : [oneForNow, ...newShapeQueue.slice(0, newShapeQueue.length)]
      const lines = previous.lines + newLines
      const level = getLevelForLines(lines)
      const ticks = action.payload ? Number(action.payload) : previous.ticks

      return {
        ...previous,
        board: {
          ...previous.board,
          activeShape,
          lines: drawBoardLines(newBoardLines, activeShape),
          previewBoards: finalShapeQueue.map(currentShape => {
            const board = createBoard(PREVIEW_BOARD_LENGTH, PREVIEW_LINE_LENGTH)
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
        lastEatenLines: newLines,
        level,
        lines,
        ticks
      }
    }
    case "BLAST": {
      let activeShape = previous.board.activeShape
      if (!activeShape) return previous
      let collidesActive = doesShapeCollidesWithFilledBoxAtSide(
        previous.board,
        activeShape,
        "bottom"
      )
      while (!collidesActive) {
        activeShape = {
          ...activeShape,
          line: activeShape.line - 1
        }

        collidesActive = doesShapeCollidesWithFilledBoxAtSide(
          previous.board,
          activeShape,
          "bottom"
        )
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
      if (!previous.board.activeShape) {
        return previous
      }
      const activeShape = {
        ...previous.board.activeShape,
        position: getNextPosition(previous.board.activeShape.position)
      }
      const collides = doesShapeCollidesWithFilledBoxInCurrentPosition(
        previous.board,
        activeShape
      )
      if (collides) {
        return previous
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
    case "RESTART": {
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
  SECOND: createHandler("SECOND", d),
  START: createHandler("START", d),
  TICK: createHandler("TICK", d)
})

export function useTetris(): [Game, Commands] {
  const [game, dispatch] = useReducer<Reducer<Game, Action>, Game>(
    reduceGame,
    initialGame,
    () => initialGame
  )

  useTick(
    t => dispatch({ type: "TICK", payload: t }),
    () => getTickForLevel(game.level),
    [game.level]
  )

  const handlers = createHandlers(dispatch)

  useTick(() => dispatch({ type: "SECOND", payload: 1 }), () => 1000, [])

  return [game, handlers]
}
