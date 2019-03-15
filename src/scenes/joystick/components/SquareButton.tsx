import { StatelessComponent, useContext } from "react"
import {
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

type Props = TouchableOpacityProps & {
  title: string
  style?: ViewStyle
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

type ContainerProps = {
  style?: ViewStyle
}

const Container = g(TouchableOpacity)<{ theme: Theme } & ContainerProps>(
  {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 4,
    borderWidth: 1,
    height: BUTTON_SIDE,
    justifyContent: "center",
    width: BUTTON_SIDE
  },
  ({ style }: ContainerProps) => ({
    ...style
  })
)

const Caption = g(Text)<{ theme: Theme }>({}, () => ({
  color: "#000000",
  fontSize: 20,
  textShadow: "-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray"
}))

export default SquareButton
