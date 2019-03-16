import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { BG_COLOR } from "../variables"
import { useKeyDowns } from "./keyboard"
import PillButton from "./PillButton"

type Props = TouchableOpacityProps & {
  select: CommandHandler
  start: CommandHandler
  visible: boolean
}

const OptionPad = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { select, start, visible } = props

  useKeyDowns([
    {
      handler: select,
      keys: [" ", "o"]
    },
    {
      handler: start,
      keys: ["Enter", "Escape"]
    }
  ])

  return visible ? (
    <ViewContainer theme={theme}>
      <PillButton
        accessibilityLabel="select button"
        title="Select"
        onPress={() => select()}
      />
      <PillButton
        accessibilityLabel="start button"
        title="Start"
        onPress={() => start()}
      />
    </ViewContainer>
  ) : null
}

const ViewContainer = g(View)({
  alignItems: "center",
  backgroundColor: BG_COLOR,
  borderColor: BG_COLOR,
  borderRadius: 45,
  borderStyle: "groove",
  borderWidth: 10,
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  height: 40,
  justifyContent: "space-evenly",
  marginTop: 5
})

export default OptionPad
