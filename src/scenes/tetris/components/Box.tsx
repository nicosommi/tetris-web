import { useContext } from "react"
import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

import { BOX_HEIGHT, BOX_WIDTH } from "../functions/settings"

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
    height: BOX_HEIGHT,
    width: BOX_WIDTH
  },
  ({ box, theme }) => ({
    backgroundColor: box.partOfShape
      ? theme.shapeColors[box.partOfShape.shape.type]
      : "white"
  })
)

export default BoxComponent
