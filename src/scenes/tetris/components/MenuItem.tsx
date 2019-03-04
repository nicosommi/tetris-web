import { Text, View } from "react-native"
import { animated } from "react-spring"
import { g, React } from "../../../utils/view"

type MenuItemProps = {
  label: string
  selected: boolean
}

const MenuItem = ({ label, selected }: MenuItemProps) => {
  return (
    <Container>
      <Label>
        {selected ? "selected - " : ""}
        {label}
      </Label>
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

export default MenuItem
