import { useContext } from "react"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

type Props = TouchableOpacityProps & {
  title: string
}

const ButtonComponent = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title } = props
  return (
    <Container {...{ ...props, theme }}>
      <ViewContainer theme={theme}>
        <Caption theme={theme}>{title}</Caption>
      </ViewContainer>
    </Container>
  )
}

const Container = g(TouchableOpacity)<{ theme: Theme }>(
  {
    borderRadius: 4,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  ({ theme }) => ({})
)

const ViewContainer = g(View)<{ theme: Theme }>({}, ({ theme }) => ({}))

const Caption = g(Text)<{ theme: Theme }>({}, ({ theme }) => ({}))

export default ButtonComponent
