import { useContext } from "react"
import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"
import { getBoxMaxSide } from "../functions/util"

interface Props {
  box: Box
  line: number
  column: number
}
const BoxComponent = (props: Props) => {
  const theme = useContext(ThemeContext)
  return (
    <Container {...{ ...props, theme }}>
      <DebugContext.Consumer>
        {debug =>
          debug ? (
            <Text>
              {props.line} / {props.column}
            </Text>
          ) : (
            undefined
          )
        }
      </DebugContext.Consumer>
    </Container>
  )
}

const Container = g(View)<Props & { theme: Theme }>(
  {
    border: "1px dashed rgba(0,0,0,.2)",
    height: getBoxMaxSide(),
    width: getBoxMaxSide()
  },
  ({ box, theme }) => ({
    backgroundColor: box.partOfShape
      ? theme.shapeColors[box.partOfShape.shape.type]
      : "white"
  })
)

export default BoxComponent
