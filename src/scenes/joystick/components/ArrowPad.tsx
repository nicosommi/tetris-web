import { useContext } from "react"
import { Text, TouchableOpacityProps, View } from "react-native"
import Button from "../../../components/Button"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { BG_COLOR } from "../variables"
import { useKeyDowns } from "./keyboard"
import SquareButton from "./SquareButton"

type Props = TouchableOpacityProps & {
  up: CommandHandler
  down: CommandHandler
  left: CommandHandler
  right: CommandHandler
  visible: boolean
}

const borderWidth = 5

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
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomWidth: 0,
          borderColor: BG_COLOR,
          borderLeftWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderTopWidth: borderWidth,
          boxSizing: "content-box"
        }}
        title={"\u25B2"}
        onPress={() => up()}
      />
      <HorizontalAxis>
        <SquareButton
          accessibilityLabel="left"
          style={{
            borderBottomRightRadius: 0,
            borderBottomWidth: borderWidth,
            borderColor: BG_COLOR,
            borderLeftWidth: borderWidth,
            borderRightWidth: 0,
            borderTopRightRadius: 0,
            borderTopWidth: borderWidth,
            boxSizing: "content-box"
          }}
          title={"\u25C0"}
          onPress={() => left()}
        />
        <VBox>
          <Gutters>
            <Text> </Text>
          </Gutters>
          <SquareButton
            accessibilityLabel="center"
            title={"\u25EF"}
            style={{
              borderColor: "#000000",
              borderLeftWidth: 0,
              borderRadius: 0,
              borderRightWidth: 0
            }}
            onPress={() => undefined}
          />
          <Gutters>
            <Text> </Text>
          </Gutters>
        </VBox>
        <SquareButton
          accessibilityLabel="right"
          style={{
            borderBottomLeftRadius: 0,
            borderBottomWidth: borderWidth,
            borderColor: BG_COLOR,
            borderLeftWidth: 0,
            borderRightWidth: borderWidth,
            borderTopLeftRadius: 0,
            borderTopWidth: borderWidth,
            boxSizing: "content-box"
          }}
          title={"\u25B6"}
          onPress={() => right()}
        />
      </HorizontalAxis>
      <SquareButton
        accessibilityLabel="down"
        style={{
          borderBottomWidth: borderWidth,
          borderColor: BG_COLOR,
          borderLeftWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopWidth: 0,
          boxSizing: "content-box"
        }}
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

const Gutters = g(View)({
  backgroundColor: "#000000",
  height: borderWidth
})

const VBox = g(View)({
  display: "flex",
  flexDirection: "column"
})

export default Joystick
