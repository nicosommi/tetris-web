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
        accessibilityLabel="select button"
        title="Select"
        type="pill"
        onPress={() => handlers.select()}
      />
      <Button
        accessibilityLabel="start button"
        title="Start"
        type="pill"
        onPress={() => handlers.start()}
      />
    </ViewContainer>
  )
}

const ViewContainer = g(View)<{ theme: Theme }>(
  {
    display: "flex",
    flexDirection: "row",
    height: 60
  },
  ({ theme }) => ({})
)

export default Joystick
