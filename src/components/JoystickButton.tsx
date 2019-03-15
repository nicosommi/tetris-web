import { StatelessComponent, useContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ThemeContext } from "../utils/theme"
import { g, React } from "../utils/view"

type Props = TouchableOpacityProps & {
  title: string
  fontSize?: number
}

const JoystickButton: StatelessComponent<Props> = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title, fontSize } = props
  return (
    <Container {...{ ...props, theme }}>
      <Caption theme={theme} fontSize={fontSize}>
        {title}
      </Caption>
    </Container>
  )
}

const BUTTON_SIDE = 30

const Container = g(TouchableOpacity)<{ theme: Theme }>(
  {
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "center",
    marginTop: -30
  },
  () => ({
    borderRadius: 0,
    borderWidth: 0,
    height: BUTTON_SIDE
  })
)

const Caption = g(Text)<{ theme: Theme; fontSize?: number }>(
  {},
  ({ fontSize }) => ({
    fontSize: fontSize ? fontSize : 20
  })
)

export default JoystickButton
