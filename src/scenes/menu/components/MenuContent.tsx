import { View } from "react-native"
import { animated } from "react-spring"
import { g, React } from "../../../utils/view"

type MenuContentProps = {
  children: React.ReactNode
}

const MenuContent = ({ children }: MenuContentProps) => {
  return <Container>{children}</Container>
}

const Container = animated(
  g(View)({
    marginTop: "10%",
    minWidth: 250,
    zIndex: 2
  })
)

export default MenuContent
