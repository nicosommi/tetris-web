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
      handler: handlers.up,
      keys: ["ArrowUp", "w"]
    },
    {
      handler: handlers.right,
      keys: ["ArrowRight", "d"]
    },
    {
      handler: handlers.left,
      keys: ["ArrowLeft", "a"]
    },
    {
      handler: handlers.down,
      keys: ["ArrowDown", "s"]
    }
  ])

  return visible ? (
    <ViewContainer theme={theme}>
      <Button
        accessibilityLabel="up"
        title={"\u25B2"}
        type="square"
        onPress={() => handlers.up()}
      />
      <HorizontalAxis>
        <Button
          accessibilityLabel="left button"
          title={"\u25C0"}
          type="square"
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
          type="square"
          onPress={() => handlers.right()}
        />
      </HorizontalAxis>
      <Button
        accessibilityLabel="down"
        title={"\u25BC"}
        type="square"
        onPress={() => handlers.down()}
      />
    </ViewContainer>
  ) : null
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
