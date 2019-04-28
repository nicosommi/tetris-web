import { StatelessComponent, useContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ThemeContext } from "../utils/theme"
import { g, React } from "../utils/view"

type Props = TouchableOpacityProps & {
  title: string
}

const ButtonComponent: StatelessComponent<Props> = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title } = props
  return (
    <Container {...{ ...props, theme }}>
      <Caption theme={theme}>{title}</Caption>
    </Container>
  )
}

const BUTTON_SIDE = 30

const Container = g(TouchableOpacity)(
  {
    alignItems: "center",
    justifyContent: "center"
  },
  () => ({
    borderRadius: 0,
    borderWidth: 0,
    height: BUTTON_SIDE
  })
)

const Caption = g(Text)({}, () => ({
  fontSize: 20
}))

export default ButtonComponent
