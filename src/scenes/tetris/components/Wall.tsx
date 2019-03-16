import { View, ViewProps } from "react-native"
import { isWeb } from "../../../utils/debug"
import { g, React } from "../../../utils/view"

type ThemeProps = { theme: Theme }

type Props = {
  children: React.ReactNode
}

export default function WallComponent({ children }: Props) {
  return (
    <Container>
      <Wall>{children}</Wall>
    </Container>
  )
}

const Container = g(View)<ViewProps>(
  {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 0
  },
  ({ theme }: ThemeProps) => ({
    background:
      theme.wall.secondaryBorderColor && isWeb()
        ? `linear-gradient(${theme.wall.borderColor}, ${
            theme.wall.secondaryBorderColor
          })`
        : undefined,
    backgroundColor:
      !theme.wall.secondaryBorderColor || !isWeb()
        ? theme.wall.borderColor
        : undefined,
    paddingLeft: theme.wall.borderWidth,
    paddingRight: theme.wall.borderWidth,
    paddingTop: theme.wall.borderWidth
  })
)

const Wall = g(View)<ViewProps>(
  {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  ({ theme }: ThemeProps) => ({
    backgroundColor: theme.wall.backgroundColor
  })
)
