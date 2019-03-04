import { Text, View } from "react-native"
import { animated } from "react-spring"
import Button from "../../../components/Button"
import { g, React } from "../../../utils/view"

type MenuItemProps = {
  label: string
  value?: unknown
  selected: boolean
  onDecrease?: () => void
  onIncrease?: () => void
  onSelect?: () => void
}

const MenuItem = ({
  label,
  selected,
  value,
  onDecrease,
  onIncrease,
  onSelect
}: MenuItemProps) => {
  return (
    <Container>
      <Label>
        {selected ? "selected - " : ""}
        {onSelect ? <Button title={label} onPress={onSelect} /> : label}{" "}
        {onDecrease && <Button title="<" onPress={onDecrease} />}
        {value && `${value}`}
        {onIncrease && <Button title=">" onPress={onIncrease} />}
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
