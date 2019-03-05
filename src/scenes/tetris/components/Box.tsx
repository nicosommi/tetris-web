import { useContext } from "react"
import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { getBoxMaxSide } from "../functions/util"

interface Props {
  box: Box
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
  {
    border: "1px dashed rgba(0,0,0,.2)"
  },
  ({ box, theme, joystickCollapsed }) => ({
    backgroundColor: box.partOfShape
      ? theme.shapeColors[box.partOfShape.shape.type]
      : "white",
    height: getBoxMaxSide(joystickCollapsed),
    width: getBoxMaxSide(joystickCollapsed)
  })
)

export default BoxComponent
