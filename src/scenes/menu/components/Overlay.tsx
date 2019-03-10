import { View } from "react-native"
import { animated, SpringConfig, useSpring } from "react-spring"
import { g, React } from "../../../utils/view"

type OverlayProps = {
  open: boolean
  children: React.ReactNode
}

const Overlay = ({ children, open }: OverlayProps) => {
  const { show } = useSpring({
    duration: 0.1,
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
