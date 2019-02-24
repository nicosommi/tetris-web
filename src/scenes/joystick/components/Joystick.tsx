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
}

const Joystick = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { handlers } = props
  return (
    <ViewContainer theme={theme}>
      <ArrowPad handlers={handlers} />
      <OptionPad handlers={handlers} />
      <ButtonPad handlers={handlers} />
    </ViewContainer>
  )
}

const ViewContainer = g(View)<{ theme: Theme }>(
  {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: 250,
    zIndex: 1
  },
  ({ theme }) => ({})
)

export default Joystick
