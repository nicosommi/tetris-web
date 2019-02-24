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
        accessibilityLabel="up"
        title={"\u25B2"}
        onPress={() => handlers.up()}
      />
      <HorizontalAxis>
        <Button
          accessibilityLabel="left button"
          title={"\u25C0"}
          onPress={() => handlers.left()}
        />
        <Button
          accessibilityLabel="center"
          title={" "}
          onPress={() => undefined}
        />
        <Button
          accessibilityLabel="right"
          title={"\u25B6"}
          onPress={() => handlers.right()}
        />
      </HorizontalAxis>
      <Button
        accessibilityLabel="down"
        title={"\u25BC"}
        onPress={() => handlers.down()}
      />
    </ViewContainer>
  )
}

const ViewContainer = g(View)<{ theme: Theme }>(
  {
    alignItems: "center",
    display: "flex",
    zIndex: 1
  },
  ({ theme }) => ({})
)
const HorizontalAxis = g(View)({
  alignItems: "center",
  display: "flex",
  flexDirection: "row"
})

export default Joystick
