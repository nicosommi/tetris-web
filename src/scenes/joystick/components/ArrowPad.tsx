import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import Button from "../../../components/Button"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { useKeyDowns } from "./keyboard"

type Props = TouchableOpacityProps & {
  up: CommandHandler
  down: CommandHandler
  left: CommandHandler
  right: CommandHandler
  visible: boolean
}

const Joystick = (props: Props) => {
  const theme = useContext(ThemeContext)

  const { up, down, left, right, visible } = props

  useKeyDowns([
    {
      handler: up,
      keys: ["ArrowUp", "w"]
    },
    {
      handler: right,
      keys: ["ArrowRight", "d"]
    },
    {
      handler: left,
      keys: ["ArrowLeft", "a"]
    },
    {
      handler: down,
      keys: ["ArrowDown", "s"]
    }
  ])

  return visible ? (
    <ViewContainer theme={theme}>
      <Button
        accessibilityLabel="up"
        title={"\u25B2"}
        type="square"
        onPress={() => up()}
      />
      <HorizontalAxis>
        <Button
          accessibilityLabel="left button"
          title={"\u25C0"}
          type="square"
          onPress={() => left()}
        />
        <Button
          type="normal"
          accessibilityLabel="center"
          title={" "}
          onPress={() => undefined}
        />
        <Button
          accessibilityLabel="right"
          title={"\u25B6"}
          type="square"
          onPress={() => right()}
        />
      </HorizontalAxis>
      <Button
        accessibilityLabel="down"
        title={"\u25BC"}
        type="square"
        onPress={() => down()}
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
