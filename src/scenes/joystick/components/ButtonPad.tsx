import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import Button from "./Button"
import { useKeyDowns } from "./keyboard"

type Props = TouchableOpacityProps & {
  handlers: JoystickCommands
  visible: boolean
}

const Joystick = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { handlers, visible } = props

  useKeyDowns([
    {
      handler: handlers.x,
      keys: ["j", "z"]
    },
    {
      handler: handlers.y,
      keys: ["k", "x"]
    }
  ])

  return visible ? (
    <ViewContainer theme={theme}>
      <Button
        accessibilityLabel="x button"
        title="X"
        type="circle"
        onPress={() => handlers.x()}
      />
      <Button
        accessibilityLabel="y button"
        title="Y"
        type="circle"
        onPress={() => handlers.y()}
      />
    </ViewContainer>
  ) : null
}

const ViewContainer = g(View)<{ theme: Theme }>({
  display: "flex",
  flexDirection: "row"
})

export default Joystick
