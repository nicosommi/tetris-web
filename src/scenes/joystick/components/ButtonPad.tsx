import { useContext } from "react"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import Button from "./Button"

type Props = TouchableOpacityProps & {
  handlers: JoystickCommands
}

const Joystick = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { handlers } = props
  return (
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
  )
}

const ViewContainer = g(View)<{ theme: Theme }>(
  {
    display: "flex",
    flexDirection: "row"
  },
  ({ theme }) => ({})
)

export default Joystick
