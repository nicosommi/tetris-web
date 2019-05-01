import { Text, TouchableOpacityProps, View } from "react-native"
import { g, React } from "../../../utils/view"
import { kindDependent } from "../functions/util"
import { BG_COLOR, FG_COLOR } from "../variables"
import ArrowPad from "./ArrowPad"
import ButtonPad from "./ButtonPad"
import OptionPad from "./OptionPad"

const { useContext } = React

export type Mask = { [key in JoystickButtonType]: CommandHandler }

type Props = TouchableOpacityProps & { mask: Mask }

export const JoystickVisibleContext = React.createContext(false)

const Joystick = (props: Props) => {
  const { up, down, left, right, select, start, x, y } = props.mask
  const visible = !useContext(JoystickVisibleContext)
  const MainComponent = visible ? ViewContainer : React.Fragment
  const FinalVBox = visible ? VBox : React.Fragment
  const FinalHBox = visible ? HBox : React.Fragment
  return (
    <MainComponent>
      <ArrowPad
        up={up}
        down={down}
        left={left}
        right={right}
        visible={visible}
      />
      <FinalVBox>
        {visible && (
          <RedCorner>
            <Text> </Text>
          </RedCorner>
        )}
        <FinalHBox>
          <OptionPad select={select} start={start} visible={visible} />
          <ButtonPad x={x} y={y} visible={visible} />
        </FinalHBox>
      </FinalVBox>
      {visible && (
        <Hrs>
          <Hr>
            <Text> </Text>
          </Hr>
          <Hr>
            <Text> </Text>
          </Hr>
          <Hr>
            <Text> </Text>
          </Hr>
        </Hrs>
      )}
    </MainComponent>
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
  alignSelf: "stretch",
  display: "flex",
  flexDirection: "column",
  flexGrow: 4,
  justifyContent: "space-evenly"
})

const RedCorner = g(View)(
  {
    alignSelf: "flex-end",
    backgroundColor: BG_COLOR,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifySelf: "stretch",
    marginTop: -35,
    width: "90%"
  },
  () => ({
    height: kindDependent(40, 80),
    marginRight: kindDependent(-14, -14)
  })
)

const HBox = g(View)({
  display: "flex",
  flexDirection: "row"
})

const Hrs = g(View)({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  height: 10,
  justifyContent: "space-evenly",
  left: 0,
  marginTop: 32,
  position: "absolute",
  width: "100%",
  zIndex: -1
})

const Hr = g(View)({
  backgroundColor: "#000000",
  height: 2
})

export default Joystick
