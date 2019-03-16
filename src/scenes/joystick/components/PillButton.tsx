import { StatelessComponent, useContext } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { kindDependent } from "../functions/util"

type Props = TouchableOpacityProps & {
  title: string
}

const PillButton: StatelessComponent<Props> = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title } = props
  return (
    <Container {...{ ...props, theme }}>
      <Caption theme={theme}>{title.toUpperCase()}</Caption>
    </Container>
  )
}

const Container = g(TouchableOpacity)<{ theme: Theme }>(
  {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 15,
    borderWidth: 1,
    height: 15,
    justifyContent: "center"
  },
  (_, BUTTON_SIDE = kindDependent(30, 45)) => ({
    minWidth: BUTTON_SIDE
  })
)

const Caption = g(Text)<{ theme: Theme }>(
  {
    fontSize: 8,
    marginTop: -60
  },
  () => ({})
)

export default PillButton
