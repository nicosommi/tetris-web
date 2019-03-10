import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import CircleButton from "./CircleButton"
import { useKeyDowns } from "./keyboard"

type Props = TouchableOpacityProps & {
  x: CommandHandler
  y: CommandHandler
  visible: boolean
}

const Joystick = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { x, y, visible } = props

  useKeyDowns([
    {
      handler: x,
      keys: ["j", "z"]
    },
    {
      handler: y,
      keys: ["k", "x"]
    }
  ])

  return visible ? (
    <ViewContainer theme={theme}>
      <CircleButton
        accessibilityLabel="x button"
        title="X"
        onPress={() => x()}
      />
      <CircleButton
        accessibilityLabel="y button"
        title="Y"
        onPress={() => y()}
      />
    </ViewContainer>
  ) : null
}

const ViewContainer = g(View)<{ theme: Theme }>({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  flexGrow: 2,
  justifyContent: "center"
})

export default Joystick
