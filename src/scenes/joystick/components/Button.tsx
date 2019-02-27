import { StatelessComponent, useContext } from "react"
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

type ButtonType = "square" | "pill" | "circle" | "normal"

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonType
}

const ButtonComponent: StatelessComponent<Props> = (props: Props) => {
  const theme = useContext(ThemeContext)
  const { title } = props
  const type = props.type || "normal"
  return (
    <Container {...{ ...props, theme, type: type || "normal" }}>
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
  ({ type }) => ({
    borderRadius:
      type === "circle"
        ? BUTTON_SIDE / 2
        : type === "pill"
        ? 15
        : type === "normal"
        ? 0
        : 4,
    borderWidth: type === "normal" ? 0 : 1,
    height: type === "pill" ? BUTTON_SIDE / 1.5 : BUTTON_SIDE,
    width: type !== "normal" ? BUTTON_SIDE : undefined
  })
)

const ViewContainer = g(View)<{ theme: Theme }>({})

const Caption = g(Text)<{ theme: Theme; type: ButtonType }>({}, ({ type }) => ({
  fontSize: type === "pill" ? 8 : type === "normal" ? 10 : 20
}))

export default ButtonComponent
