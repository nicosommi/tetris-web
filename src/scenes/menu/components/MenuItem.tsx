import { Text, View } from "react-native"
import { animated } from "react-spring"
import { g, React } from "../../../utils/view"

type MenuItemProps = {
  label: string
  value?: unknown
  selected: boolean
}

const MenuItem = ({ label, selected, value }: MenuItemProps) => {
  return (
    <Container>
      <Label>
        {selected ? "selected - " : ""}
        {label}
        {` (${value})`}
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
