import { StatelessComponent, useContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

type Props = TouchableOpacityProps & {
  title: string
}

const SquareButton: StatelessComponent<Props> = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title } = props
  return (
    <Container {...{ ...props, theme }}>
      <Caption theme={theme}>{title}</Caption>
    </Container>
  )
}

const BUTTON_SIDE = 45

const Container = g(TouchableOpacity)<{ theme: Theme }>(
  {
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    height: BUTTON_SIDE,
    justifyContent: "center",
    width: BUTTON_SIDE
  },
  () => ({})
)

const Caption = g(Text)<{ theme: Theme }>({}, () => ({
  fontSize: 20
}))

export default SquareButton
