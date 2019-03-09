import { Text, TextProps, View, ViewProps } from "react-native"
import { animated } from "react-spring"
import Button from "../../../components/Button"
import { g, React } from "../../../utils/view"

type MenuItemProps = {
  label: string
  value?: boolean | string | unknown
  selected: boolean
  onDecrease?: () => void
  onIncrease?: () => void
  onSelect?: () => void
}

const translateValue = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? "ON" : "OFF"
  }
  if (typeof value === "string") {
    return value
  }
}

const MenuItem = ({
  label,
  selected,
  value,
  onDecrease,
  onIncrease,
  onSelect
}: MenuItemProps) => {
  const processedValue =
    typeof value === "boolean"
      ? value
      : typeof value === "string"
      ? value
      : String(value)
  return (
    <Container selected={selected}>
      <Label>
        {onSelect ? <Button title={label} onPress={onSelect} /> : label}{" "}
        {/* {onDecrease && <Button title="(" onPress={onDecrease} />} */}
        {value !== undefined && `${translateValue(processedValue)}`}
        {/* {onIncrease && <Button title=">" onPress={onIncrease} />} */}
      </Label>
    </Container>
  )
}

type ContainerProps = {
  selected: boolean
}

const Container = animated(
  g(View)<ViewProps & ContainerProps>(
    {
      padding: 10
    },
    ({ selected }: ContainerProps) => ({
      backgroundColor: selected ? "rgba(100,100,100,1)" : "rgba(0,0,0,0)",
      zIndex: 2
    })
  )
)

type LabelProps = { theme: Theme }

const Label = animated(
  g(Text)<TextProps>(
    {
      color: "#ffffff",
      fontSize: 20,
      zIndex: 2
    },
    ({ theme }: LabelProps) => ({
      fontFamily: theme.fontFamily
    })
  )
)

export default MenuItem
