import { useContext } from "react"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import ArrowPad from "./ArrowPad"
import ButtonPad from "./ButtonPad"
import OptionPad from "./OptionPad"

type Props = TouchableOpacityProps & {
  handlers: JoystickCommands
  visible: boolean
}

const Joystick = (props: Props) => {
  const theme = useContext(ThemeContext)

  const { handlers, visible } = props
  return (
    <ViewContainer theme={theme}>
      <ArrowPad handlers={handlers} visible={visible} />
      <OptionPad handlers={handlers} visible={visible} />
      <ButtonPad handlers={handlers} visible={visible} />
    </ViewContainer>
  )
}

const ViewContainer = g(View)<{ theme: Theme }>({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  minWidth: 175,
  position: "relative",
  zIndex: 1
})

export default Joystick
