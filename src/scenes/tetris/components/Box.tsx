import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { g, React } from "../../../utils/view"
import { JoystickVisibleContext } from "../../joystick/components/Joystick"
import { getBoxMaxSide } from "../functions/util"

const { useContext } = React

interface Props {
  box: Box
  grid: boolean
  line: number
  column: number
}
const BoxComponent = (props: Props) => {
  const joystickCollapsed = useContext(JoystickVisibleContext)
  return (
    <Container {...{ ...props, joystickCollapsed }}>
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

type ContainerProps = Props & { joystickCollapsed: boolean }

const Container = g(View)<ContainerProps>(
  {},
  (
    { box, grid, theme, joystickCollapsed }: ContainerProps & { theme: Theme },
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
    height: getBoxMaxSide(joystickCollapsed),
    width: getBoxMaxSide(joystickCollapsed)
  })
)

export default BoxComponent
