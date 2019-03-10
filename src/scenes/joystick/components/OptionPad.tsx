import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
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

const ViewContainer = g(View)<{ theme: Theme }>({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  height: 60,
  justifyContent: "center"
})

export default OptionPad
