import { View } from "react-native"
import { animated, SpringConfig, useSpring } from "react-spring"
import { g, React } from "../../../utils/view"

type OverlayProps = {
  open: boolean
  children: React.ReactNode
}

const config: SpringConfig = {
  clamp: false,
  friction: 10,
  mass: 1,
  tension: 360
}

const Overlay = ({ children, open }: OverlayProps) => {
  const { show } = useSpring({
    config,
    from: { show: "0%" },
    reverse: !open,
    show: "100%"
  })

  return <Container show={show}>{open ? children : null}</Container>
}

type ContainerProps = {
  show: string
}

const Container = animated(
  g(View)(
    {
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      left: 0,
      overflowX: "hidden",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1
    },
    ({ show }: ContainerProps) => ({
      height: show
    })
  )
)

export default Overlay
