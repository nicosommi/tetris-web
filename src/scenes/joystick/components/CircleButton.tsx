import { StatelessComponent, useContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { kindDependent } from "../functions/util"
import { FG_COLOR } from "../variables"

type Props = TouchableOpacityProps & {
  title: string
}

const CircleButton: StatelessComponent<Props> = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title } = props
  return (
    <Container {...{ ...props, theme }}>
      <Caption theme={theme}>{title}</Caption>
    </Container>
  )
}

const Container = g(TouchableOpacity)(
  {
    alignItems: "center",
    backgroundColor: "#000000",
    borderWidth: 1,
    justifyContent: "center"
  },
  (_, BUTTON_SIDE = kindDependent(33, 50)) => ({
    borderRadius: BUTTON_SIDE / 2,
    height: BUTTON_SIDE,
    minWidth: BUTTON_SIDE
  })
)

const Caption = g(Text)(
  {
    backgroundColor: "#000000",
    borderRadius: 10,
    color: FG_COLOR,
    fontSize: 14,
    textAlign: "center",
    width: "75%"
  },
  () => ({
    marginTop: kindDependent(-55, -70)
  })
)

export default CircleButton
