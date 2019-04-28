import { StatelessComponent } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { kindDependent } from "../utils/util"
import { g, keyframes, React } from "../utils/view"

type Props = TouchableOpacityProps & {
  blink?: boolean
  title: string
  fontSize?: number
}

const JoystickButton: StatelessComponent<Props> = (props: Props) => {
  const { blink, title, fontSize } = props
  return (
    <Container {...{ ...props }}>
      <Caption fontSize={fontSize} blink={blink}>
        {title}
      </Caption>
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

const blinker = keyframes(`
  50% {
    opacity: 0;
  }
`)

type CaptionProps = {
  blink?: boolean
  fontSize?: number
}

const Caption = g(Text, {
  shouldForwardProp: prop => prop !== "blink"
})<CaptionProps>(
  {},
  ({ blink, theme, fontSize }: CaptionProps & { theme: Theme }) => ({
    animation: blink ? `${blinker} 1.2s linear infinite` : undefined,
    color: theme.color,
    fontFamily: theme.fontFamily,
    fontSize: fontSize ? fontSize : kindDependent(10, 20)
  })
)

export default JoystickButton
