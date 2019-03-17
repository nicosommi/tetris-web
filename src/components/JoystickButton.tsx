import { StatelessComponent, useContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ThemeContext } from "../utils/theme"
import { g, React } from "../utils/view"

type Props = TouchableOpacityProps & {
  title: string
  fontSize?: number
}

const JoystickButton: StatelessComponent<Props> = (props: Props) => {
  const { title, fontSize } = props
  return (
    <Container {...{ ...props }}>
      <Caption fontSize={fontSize}>{title}</Caption>
    </Container>
  )
}

const BUTTON_SIDE = 30

const Container = g(TouchableOpacity)(
  {
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "center"
  },
  () => ({
    borderRadius: 0,
    borderWidth: 0,
    height: BUTTON_SIDE
  })
)

const Caption = g(Text)<{ fontSize?: number }>(
  {},
  ({ theme, fontSize }: { theme: Theme; fontSize?: number }) => ({
    color: theme.color,
    fontFamily: theme.fontFamily,
    fontSize: fontSize ? fontSize : 20
  })
)

export default JoystickButton
