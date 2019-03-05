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
  ({ box, grid, theme, joystickCollapsed }) => ({
    backgroundColor: box.partOfShape
      ? theme.shapeColors[box.partOfShape.shape.type]
      : "white",
    border: grid ? "1px dashed rgba(0,0,0,.2)" : 0,
    height: getBoxMaxSide(joystickCollapsed),
    width: getBoxMaxSide(joystickCollapsed)
  })
)

export default BoxComponent
