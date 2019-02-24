import { useContext } from "react"
import { TouchableOpacityProps, View } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import Button from "./Button"
import { useKeyDowns } from "./keyboard"

type Props = TouchableOpacityProps & {
  handlers: JoystickCommands
}

const OptionPad = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { handlers } = props

  useKeyDowns([
    {
      handler: handlers.select,
      keys: [" ", "o"]
    },
    {
      handler: handlers.start,
      keys: ["Enter", "Escape"]
    }
  ])

  return (
    <ViewContainer theme={theme}>
      <Button
        accessibilityLabel="select button"
        title="Select"
        type="pill"
        onPress={() => handlers.select()}
      />
      <Button
        accessibilityLabel="start button"
        title="Start"
        type="pill"
        onPress={() => handlers.start()}
      />
    </ViewContainer>
  )
}

const ViewContainer = g(View)<{ theme: Theme }>(
  {
    display: "flex",
    flexDirection: "row",
    height: 60
  },
  ({ theme }) => ({})
)

export default OptionPad
