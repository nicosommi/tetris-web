import { createShape, getShapeMaxPoints } from "../shape"

const shapeTypes: ShapeType[] = ["i", "j", "l", "o", "s", "t", "z"]
const shapePositions: ShapePosition[] = [0, 1, 2, 3]

shapeTypes.forEach(shapeType =>
  shapePositions.forEach(shapePosition =>
    test(`a ${shapeType} shape in position ${shapePosition} snapshot should have the appropiate max points at each side ì`, () => {
      const shape: Shape = createShape({
        position: shapePosition,
        type: shapeType
      })
      delete shape.id // for snapshot purposes
      const bottom = getShapeMaxPoints(shape, "bottom")
      const right = getShapeMaxPoints(shape, "right")
      const left = getShapeMaxPoints(shape, "left")
      expect({ shape, bottom, left, right }).toMatchSnapshot()
    })
  )
)
