import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import ArrowPad from "./ArrowPad"
import ButtonPad from "./ButtonPad"
import OptionPad from "./OptionPad"

type Props = TouchableOpacityProps &
  { [key in JoystickButtonType]: CommandHandler } & {
    visible: boolean
  }

const Joystick = (props: Props) => {
  const theme = useContext(ThemeContext)

  const { up, down, left, right, select, start, x, y, visible } = props
  return (
    <ViewContainer theme={theme}>
      <ArrowPad
        up={up}
        down={down}
        left={left}
        right={right}
        visible={visible}
      />
      <OptionPad select={select} start={start} visible={visible} />
      <ButtonPad x={x} y={y} visible={visible} />
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
  zIndex: 10
})

export default Joystick
