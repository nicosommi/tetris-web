import {
  coordinates,
  createShape,
  getFacePoints,
  getShapeFacePoints
} from "../shape"

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
      const bottom = getShapeFacePoints(shape, "bottom")
      const right = getShapeFacePoints(shape, "right")
      const left = getShapeFacePoints(shape, "left")
      expect({ shape, bottom, left, right }).toMatchSnapshot()
    })
  )
)
const sides: Side[] = ["bottom", "top", "left", "right"]
sides.forEach(side => {
  const coords = coordinates[2].s
  test(`get max points at side ${side} for shape ${"s"} at position ${2}`, () => {
    expect(getFacePoints(coords, side)).toMatchSnapshot()
  })
})
