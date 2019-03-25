import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { g, React } from "../../../utils/view"
import { getBoxMaxSide } from "../functions/util"

interface Props {
  box: Box
  grid: boolean
  line: number
  column: number
  joystickCollapsed: boolean
}
const BoxComponent = (props: Props) => {
  return (
    <Container {...{ ...props }}>
      <DebugContext.Consumer>
        {debug =>
          debug ? (
            <Text>
              {props.line} / {props.column}
            </Text>
          ) : (
            undefined
          )
        }
      </DebugContext.Consumer>
    </Container>
  )
}

const Container = g(View)<Props>(
  {},
  (
    { box, grid, theme, joystickCollapsed }: Props & { theme: Theme },
    MAX_SIDE = getBoxMaxSide(joystickCollapsed)
  ) => ({
    backgroundColor: box.partOfShape
      ? theme.shapeColors[box.partOfShape.shape.type]
      : theme.box.backgroundColor,
    borderColor: box.partOfShape
      ? theme.shapeBox.borderColor
      : grid
      ? theme.box.borderColor
      : undefined,
    borderStyle: grid ? "dashed" : undefined,
    borderWidth: box.partOfShape ? theme.shapeBox.borderWidth : grid ? 1 : 0,
    height: MAX_SIDE,
    width: MAX_SIDE
  })
)

export default BoxComponent
