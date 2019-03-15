import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import Button from "../../../components/Button"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { useKeyDowns } from "./keyboard"
import SquareButton from "./SquareButton"

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
      <SquareButton
        accessibilityLabel="up"
        style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        title={"\u25B2"}
        onPress={() => up()}
      />
      <HorizontalAxis>
        <SquareButton
          accessibilityLabel="left"
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          title={"\u25C0"}
          onPress={() => left()}
        />
        <SquareButton
          accessibilityLabel="center"
          title={"\u25EF"}
          style={{ borderRadius: 0 }}
          onPress={() => undefined}
        />
        <SquareButton
          accessibilityLabel="right"
          style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
          title={"\u25B6"}
          onPress={() => right()}
        />
      </HorizontalAxis>
      <SquareButton
        accessibilityLabel="down"
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        title={"\u25BC"}
        onPress={() => down()}
      />
    </ViewContainer>
  ) : null
}

const ViewContainer = g(View)<{ theme: Theme }>(
  {
    alignItems: "center",
    display: "flex",
    flexGrow: 3,
    zIndex: 1
  },
  () => ({})
)
const HorizontalAxis = g(View)({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  marginBottom: 0,
  marginTop: 0
})

export default Joystick
