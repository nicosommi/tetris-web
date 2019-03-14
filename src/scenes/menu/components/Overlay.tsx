import { View } from "react-native"
import { animated } from "react-spring"
import { g, React } from "../../../utils/view"

type OverlayProps = {
  open: boolean
  children: React.ReactNode
}

const Overlay = ({ children, open }: OverlayProps) => {
  return <Container show={open}>{open ? children : null}</Container>
}

type ContainerProps = {
  show: boolean
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
      transition: "height 0.5s",
      width: "100%",
      zIndex: 1
    },
    ({ show }: ContainerProps) => ({
      height: show ? "100%" : 0
    })
  )
)

export default Overlay
