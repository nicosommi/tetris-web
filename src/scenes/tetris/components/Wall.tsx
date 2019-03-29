import { View, ViewProps } from "react-native"
import { isWeb } from "../../../utils/debug"
import { kindDependent, orientationDependent } from "../../../utils/util"
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
    flexGrow: 1,
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  ({ theme }: ThemeProps) => ({
    backgroundColor: isWeb()
      ? theme.wall.borderColor
      : theme.wall.backgroundColor,
    ...kindDependent(buildSmallBricks(theme), buildBricks(theme)),
    flexDirection: orientationDependent("row", "column")
  })
)

function buildBricks(theme: Theme): any {
  return {
    backgroundImage: isWeb()
      ? `linear-gradient(335deg, ${
          theme.wall.backgroundColor
        } 23px, transparent 23px), linear-gradient(155deg, ${
          theme.wall.backgroundColor
        } 23px, transparent 23px), linear-gradient(335deg, ${
          theme.wall.backgroundColor
        } 23px, transparent 23px), linear-gradient(155deg, ${
          theme.wall.backgroundColor
        } 23px, transparent 23px)`
      : undefined,
    backgroundPosition: isWeb()
      ? "0px 2px, 4px 35px, 29px 31px, 34px 6px"
      : undefined,
    backgroundSize: isWeb() ? "58px 58px" : undefined
  }
}

function buildSmallBricks(theme: Theme): any {
  return {
    backgroundColor: theme.wall.backgroundColor,
    backgroundImage: isWeb()
      ? `linear-gradient(335deg, ${
          theme.wall.borderColor
        } 23px, transparent 23px),
      linear-gradient(155deg, ${theme.wall.borderColor} 23px, transparent 23px),
      linear-gradient(335deg, ${theme.wall.borderColor} 23px, transparent 23px),
      linear-gradient(155deg, ${theme.wall.borderColor} 23px, transparent 23px),
      linear-gradient(335deg, ${theme.wall.borderColor} 10px, transparent 10px),
      linear-gradient(155deg, ${theme.wall.borderColor} 10px, transparent 10px),
      linear-gradient(335deg, ${theme.wall.borderColor} 10px, transparent 10px),
      linear-gradient(155deg, ${theme.wall.borderColor} 10px, transparent 10px)`
      : undefined,
    backgroundPosition: `0px 2px, 4px 35px, 29px 31px, 33px 6px, 0px 36px, 4px 2px, 29px 6px, 33px 30px`,
    backgroundSize: isWeb() ? "58px 58px" : undefined
  }
}
