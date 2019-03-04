import { Text, View } from "react-native"
import { animated } from "react-spring"
import { g, React } from "../../../utils/view"

type MenuTitleProps = {
  label: string
}

const MenuTitle = ({ label }: MenuTitleProps) => {
  return (
    <Container>
      <Label>{label}</Label>
    </Container>
  )
}

const Container = animated(
  g(View)({
    zIndex: 2
  })
)

const Label = animated(
  g(Text)({
    backgroundColor: "#ffffff",
    zIndex: 2
  })
)

export default MenuTitle
