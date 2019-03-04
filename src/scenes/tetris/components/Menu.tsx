import { View } from "react-native"
import { animated, config, useSpring } from "react-spring"
import { g, React } from "../../../utils/view"

type MenuProps = {
  open: boolean
}

const Menu = ({ open }: MenuProps) => {
  const { show } = useSpring({
    config: config.stiff,
    from: { show: "0%" },
    reset: !open,
    reverse: open,
    show: "100%"
  })

  return <Container show={show} />
}

type ContainerProps = {
  show: string
}

const Container = animated(
  g(View)(
    {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      left: 0,
      overflowX: "hidden",
      position: "fixed",
      top: 0,
      zIndex: 1
    },
    ({ show }: ContainerProps) => ({
      height: show,
      width: show
    })
  )
)

export default Menu
