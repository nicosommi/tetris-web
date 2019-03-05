import { Text, TextProps, View } from "react-native"
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
  g(Text)<TextProps>(
    {
      color: "#ffffff",
      fontSize: 30,
      zIndex: 2
    },
    ({ theme }) => ({
      fontFamily: theme.fontFamily
    })
  )
)

export default MenuTitle
