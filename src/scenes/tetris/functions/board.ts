import { BOARD_LENGTH, LINE_LENGTH } from "./settings"
import { createLine, getAbsoluteShapeCoordinates, translateLine } from "./shape"
import { chance } from "./util"

const c = chance()
export function createBoard(
  boardLength = BOARD_LENGTH,
  lineLength = LINE_LENGTH
): Board {
  return {
    activeShape: undefined,
    id: c.guid({ version: 4 }),
    lines: Array.from(new Array(boardLength)).map(() => {
      return Array.from(new Array(lineLength)).map(() => ({
        id: c.guid({ version: 4 })
      }))
    }),
    previewBoards: [],
    shapeQueue: []
  }
}

function isNotPartOfAFigure(box: AnonymousBox) {
  return !box.partOfShape || !box.partOfShape.id ? true : false
}

function fullLineDetected(line: AnonymousBox[]): boolean {
  return line.find(box => isNotPartOfAFigure(box)) === undefined
}

export function simplifyLines(board: Board): [Line[], number] {
  let simplifiedLines = 0
  const newLines = board.lines.reduce(
    (acc, line) => {
      if (fullLineDetected(line)) {
        simplifiedLines++
        return [createLine(), ...acc.slice()]
      }
      return [...acc, line]
    },
    [] as AnonymousBox[][]
  )
  return [newLines, simplifiedLines]
}

export function drawBoardLines(
  boardLines: Line[],
  activeShape?: Shape
): Line[] {
  if (!activeShape) {
    return [...boardLines]
  }
  const coords = getAbsoluteShapeCoordinates(activeShape)
  // console.log("coords", { coords })
  return boardLines.map((line, rowIndex) => {
    const currentLine = translateLine(boardLines.length, rowIndex)
    return line.map((box, columnIndex) => {
      // FIXME: instead go over shape coordinates and check if on any to mark
      if (
        coords.find(({ x, y }) => y === currentLine && x === columnIndex) !==
        undefined
      ) {
        const shapePartId = chance().guid()
        return {
          ...box,
          partOfShape: {
            id: shapePartId,
            order: 1,
            shape: activeShape
          }
        }
      } else if (
        box.partOfShape &&
        box.partOfShape.shape.id === activeShape.id
      ) {
        return {
          ...box,
          partOfShape: undefined
        }
      }
      return {
        ...box
      }
    })
  })
}
