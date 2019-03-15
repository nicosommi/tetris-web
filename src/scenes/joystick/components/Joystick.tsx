import { Text, TouchableOpacityProps, View } from "react-native"
import { g, React } from "../../../utils/view"
import { BG_COLOR, FG_COLOR } from "../variables"
import ArrowPad from "./ArrowPad"
import ButtonPad from "./ButtonPad"
import OptionPad from "./OptionPad"

type Props = TouchableOpacityProps &
  { [key in JoystickButtonType]: CommandHandler } & {
    visible: boolean
  }

const Joystick = (props: Props) => {
  const { up, down, left, right, select, start, x, y, visible } = props
  return (
    <ViewContainer>
      <ArrowPad
        up={up}
        down={down}
        left={left}
        right={right}
        visible={visible}
      />
      <VBox>
        {visible && (
          <RedCorner>
            <Text> </Text>
          </RedCorner>
        )}
        <HBox>
          <OptionPad select={select} start={start} visible={visible} />
          <ButtonPad x={x} y={y} visible={visible} />
        </HBox>
      </VBox>
    </ViewContainer>
  )
}

const ViewContainer = g(View)({
  alignItems: "center",
  backgroundColor: FG_COLOR,
  borderColor: BG_COLOR,
  borderWidth: 10,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  minWidth: 175,
  padding: 10
})

const VBox = g(View)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 4
  // minWidth: "60%"
})

const RedCorner = g(View)({
  backgroundColor: BG_COLOR,
  display: "flex",
  flexDirection: "column",
  height: 80,
  justifySelf: "stretch",
  marginRight: -10,
  marginTop: -35
})

const HBox = g(View)({
  display: "flex",
  flexDirection: "row"
})

export default Joystick
