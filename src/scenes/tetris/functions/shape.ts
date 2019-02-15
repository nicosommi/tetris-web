import {
  BOARD_LENGTH,
  GAME_ROTATION_DIRECTION,
  LINE_LENGTH,
  SHAPE_QUEUE_LENGTH
} from "./settings"
import { chance } from "./util"

// rotate: (x,y) -> (-y,x)
export const rotate90Left = (points: Point[]): Point[] => {
  // rotate
  // tslint:disable-next-line:variable-name
  const newPoints = points.map(({ x: _x, y: _y }) => ({ x: -_y, y: _x }))
  // find bottom left point (origin)
  const bottomPoints = getMaxPoints(newPoints, "bottom")
  const originPoint = getMaxPoints(bottomPoints, "left")[0]
  // translate to origin = 0,0
  const deltaX = -originPoint.x
  const deltaY = -originPoint.y
  return newPoints.map(({ x, y }) => ({ x: x + deltaX, y: y + deltaY }))
}

const coordinatesOn1stCuadrant: ShapeCoordinates = {
  i: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
  j: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
  l: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
  o: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
  s: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  t: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }],
  z: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }]
}

const shapes: ShapeType[] = (Object.keys(
  coordinatesOn1stCuadrant
) as unknown) as ShapeType[]

const coordinatesOn2ndCuadrant: ShapeCoordinates = {
  ...shapes.reduce<ShapeCoordinates>(
    (acc, key) => ({
      ...acc,
      [key]: rotate90Left(coordinatesOn1stCuadrant[key])
    }),
    {} as any
  )
}

const coordinatesOn3rdCuadrant: ShapeCoordinates = {
  ...shapes.reduce<ShapeCoordinates>(
    (acc, key) => ({
      ...acc,
      [key]: rotate90Left(coordinatesOn2ndCuadrant[key])
    }),
    {} as any
  )
}
const coordinatesOn4thCuadrant: ShapeCoordinates = {
  ...shapes.reduce<ShapeCoordinates>(
    (acc, key) => ({
      ...acc,
      [key]: rotate90Left(coordinatesOn3rdCuadrant[key])
    }),
    {} as any
  )
}

export const coordinates: ShapeAllPositionCoordinates = {
  0: coordinatesOn1stCuadrant,
  1: coordinatesOn2ndCuadrant,
  2: coordinatesOn3rdCuadrant,
  3: coordinatesOn4thCuadrant
}

const c = chance()
export function createShape(
  initial: Partial<AnonymousShape> = {},
  boardLength = BOARD_LENGTH
): Shape {
  const type = c.pickone(["o", "i", "s", "z", "l", "j", "t"]) as ShapeType
  return {
    column: 4,
    id: c.guid({ version: 4 }),
    line: boardLength - 1,
    position: 0,
    type,
    ...initial
  }
}

export function createLine(lineLength = LINE_LENGTH): AnonymousBox[] {
  const boxes = new Array(lineLength).fill({})
  return boxes.map(() => ({ id: c.guid({ version: 4 }) }))
}

function getRotatedCoordinates(shape: Shape) {
  return coordinates[shape.position][shape.type]
}

export function getNextPosition(currentPosition: ShapePosition): ShapePosition {
  switch (currentPosition) {
    case 0:
      return GAME_ROTATION_DIRECTION === "clockwise" ? 1 : 3
    case 1:
      return GAME_ROTATION_DIRECTION === "clockwise" ? 2 : 0
    case 2:
      return GAME_ROTATION_DIRECTION === "clockwise" ? 3 : 1
    default:
      return GAME_ROTATION_DIRECTION === "clockwise" ? 0 : 2
  }
}

export function translateLine(lines: number, y: number): number {
  return lines - y
}

export function getAbsoluteShapeCoordinates(shape: Shape): Point[] {
  const finalPoints: Point[] = getRotatedCoordinates(shape)
  // at this point we are sure is not off the screen (that is ensured by user controls)
  const result = finalPoints.map(({ x, y }) => ({
    x: x + shape.column,
    y: y + shape.line
  }))
  return result
}

function getYsByXs(points: Point[]): XsByXs {
  return points.reduce<XsByXs>(
    (acc, { x, y }) => ({
      ...acc,
      [x]: [...(acc[x] || []), y]
    }),
    {} as any
  )
}

function getXsByYs(points: Point[]): XsByXs {
  return points.reduce<XsByXs>(
    (acc, { x, y }) => ({
      ...acc,
      [y]: [...(acc[y] || []), x]
    }),
    {} as any
  )
}

function getMaxPoints(points: Point[], side: Side): Point[] {
  const xsByXs =
    side === "top" || side === "bottom" ? getYsByXs(points) : getXsByYs(points)
  // suspicious: operation with signs might be more simple
  // the swap of x by y because of the previous if is a bit complex and even clunky to my own taste, but it works for now
  // xsbyxs is a confusing name but I couldn't think of any thing better yet
  const result = Object.keys(xsByXs).map(key => {
    return {
      x:
        side === "left" || side === "right"
          ? side === "right"
            ? Math.max.apply(null, xsByXs[key])
            : Math.min.apply(null, xsByXs[key])
          : Number(key),
      y:
        side === "bottom" || side === "top"
          ? side === "top"
            ? Math.max.apply(null, xsByXs[key])
            : Math.min.apply(null, xsByXs[key])
          : Number(key)
    }
  })
  return result
}

export function getShapeMaxPoints(shape: Shape, side: Side): Point[] {
  const absoluteRotatedCoordinates = getAbsoluteShapeCoordinates(shape)
  return getMaxPoints(absoluteRotatedCoordinates, side)
}

export function getShapeShownHeight(shape: Shape): number {
  const rotatedCoordinates = getRotatedCoordinates(shape)
  const maxY = Math.max.apply(null, rotatedCoordinates.map(rc => rc.y)) + 1
  const availableHeight = BOARD_LENGTH - shape.line
  if (availableHeight < maxY) {
    return availableHeight
  }
  return maxY
}

export function getShapeWidth(shape: Shape): number {
  const rotatedXs = getRotatedCoordinates(shape).map(rc => rc.x)
  const minX = Math.min.apply(null, rotatedXs)
  const maxX = Math.max.apply(null, rotatedXs)
  return maxX - minX
}

function isOffTheBoard({ x, y }: Point, side: Side, shape: Shape): boolean {
  switch (side) {
    case "bottom":
      return y <= 1
    case "left":
      return x <= 0
    case "right": {
      return x > LINE_LENGTH - getShapeWidth(shape) + (x - shape.column) - 1
    }
    case "top": {
      return (
        y > BOARD_LENGTH - getShapeShownHeight(shape) + (y - shape.line) - 1
      )
    }
  }
  return true
}

export function doesShapeCollidesWithFilledBoxAtSide(
  board: Board,
  shape: Shape,
  side: Side
): boolean {
  const points: Point[] = getShapeMaxPoints(shape, side)
  return points.find(({ x: currentPointColumn, y: currentPointRow }) => {
    const currentLine = translateLine(board.lines.length, currentPointRow)
    if (
      isOffTheBoard({ x: currentPointColumn, y: currentPointRow }, side, shape)
    ) {
      return true
    }
    if (side === "bottom") {
      if (currentPointRow > board.lines.length) {
        return true
      }
      // check bottom side
      const box = board.lines[currentLine + 1][currentPointColumn]
      if (box.partOfShape && box.partOfShape.shape.id !== shape.id) {
        return true
      }
      return false
    } else if (side === "left") {
      if (currentPointRow <= 0) {
        return false
      }
      const box = board.lines[currentLine][currentPointColumn - 1]
      return box.partOfShape !== undefined &&
        box.partOfShape.shape.id !== shape.id
        ? true
        : false
    } else if (side === "right") {
      if (currentPointColumn + 1 >= board.lines[currentLine].length) {
        return true
      }
      const box = board.lines[currentLine][currentPointColumn + 1]
      return box.partOfShape !== undefined &&
        box.partOfShape.shape.id !== shape.id
        ? true
        : false
    }
    return false
  }) !== undefined
    ? true
    : false
}

export function doesShapeCollidesWithFilledBoxInCurrentPosition(
  board: Board,
  shape: Shape
): boolean {
  // this just checks that the shape current points can be placed on the board
  const shapeCoordinates = getAbsoluteShapeCoordinates(shape)
  return shapeCoordinates.find(point => {
    const sides: Side[] = ["left", "right", "bottom", "top"]
    // is within its limits
    const pointOffTheBoard = sides.find(side => {
      return isOffTheBoard(point, side, shape)
    })
    let collision = false
    const pointBoxLine = board.lines[translateLine(BOARD_LENGTH, point.y)]
    if (pointBoxLine) {
      const pointBox = pointBoxLine[point.x]
      // does not overlap with an existing box with a shape different from this shape (to simplify algorithm complexity)
      collision =
        pointBox !== undefined &&
        pointBox.partOfShape !== undefined &&
        pointBox.partOfShape.shape !== undefined &&
        pointBox.partOfShape.shape.id !== undefined &&
        pointBox.partOfShape.shape.id !== shape.id
    }
    return pointOffTheBoard ? true : collision ? true : false
  }) !== undefined
    ? true
    : false
}

export function prepareQueue(board: Board): [Shape[], Shape] {
  const newQueue = [...board.shapeQueue]
  for (let i = board.shapeQueue.length; i < SHAPE_QUEUE_LENGTH; i++) {
    newQueue[i] = createShape({}, board.lines.length)
  }
  return [newQueue.slice(1), newQueue[0]]
}

// TODO: refactor to putShapeInTheNextLineOfTheBoard
export function putShapeInTheBoard(shape: Shape, board: Board) {
  if (doesShapeCollidesWithFilledBoxAtSide(board, shape, "bottom") === true) {
    return undefined
  }
  return {
    ...shape
  }
}
