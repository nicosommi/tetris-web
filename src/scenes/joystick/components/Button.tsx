import { StatelessComponent, useContext } from "react"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

type ButtonType = "square" | "pill" | "circle"

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonType
}

const ButtonComponent: StatelessComponent<Props> = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title } = props
  const type = props.type || "square"
  return (
    <Container {...{ ...props, theme, type: type || "square" }}>
      <ViewContainer theme={theme}>
        <Caption theme={theme} type={type}>
          {title}
        </Caption>
      </ViewContainer>
    </Container>
  )
}

const BUTTON_SIDE = 30

const Container = g(TouchableOpacity)<{ theme: Theme; type: ButtonType }>(
  {
    alignItems: "center",
    justifyContent: "center"
  },
  ({ theme, type }) => ({
    borderRadius:
      type === "circle" ? BUTTON_SIDE / 2 : type === "pill" ? 15 : 4,
    borderWidth: 1,
    height: type === "pill" ? BUTTON_SIDE / 1.5 : BUTTON_SIDE,
    width: BUTTON_SIDE
  })
)

const ViewContainer = g(View)<{ theme: Theme }>({}, ({ theme }) => ({}))

const Caption = g(Text)<{ theme: Theme; type: ButtonType }>({}, ({ type }) => ({
  fontSize: type === "pill" ? 8 : 20
}))

export default ButtonComponent
