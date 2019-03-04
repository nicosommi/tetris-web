import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import Button from "../../../components/Button"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
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
      <Button
        accessibilityLabel="x button"
        title="X"
        type="circle"
        onPress={() => x()}
      />
      <Button
        accessibilityLabel="y button"
        title="Y"
        type="circle"
        onPress={() => y()}
      />
    </ViewContainer>
  ) : null
}

const ViewContainer = g(View)<{ theme: Theme }>({
  display: "flex",
  flexDirection: "row"
})

export default Joystick
