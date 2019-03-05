import { Text, TextProps, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import {
  EmotionThemeProvider,
  getThemeByName,
  ThemeContext
} from "../../../utils/theme"
import { g, React } from "../../../utils/view"

import { useTetris } from "../functions/hook"

import ButtonComponent from "../../../components/Button"
import Joystick from "../../joystick/components/Joystick"
import MenuItem from "../../menu/components/MenuItem"
import MenuTitle from "../../menu/components/MenuTitle"
import Overlay from "../../menu/components/Overlay"
import useMenu, { MenuActionType } from "../../menu/functions/hook"
import BoardComponent from "./Board"
import BoxComponent from "./Box"
import ShapePreview from "./ShapePreview"

const { useState } = React

type Props = {
  themeName?: ThemeNames
}

type MenuOptionIds = "continue" | "new-game" | "music" | "sound" | "theme"
type MenuOptions = {
  [key in MenuOptionIds]: {
    handler: (type: MenuActionType) => void
    label: string
  }
}

type Volume = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type Settings = {
  music: Volume
  sound: Volume
  theme: ThemeNames
}

const tetris = ({ themeName = "default" }: Props) => {
  // TODO: receive default configuration via parameter (initial game maybe)
  // e.g. change keyboard assignation, etc
  const [settings, setSetting] = useState<Settings>({
    music: 0,
    sound: 0,
    theme: "default"
  })

  const [game, handlers] = useTetris()

  const menuOptions: MenuOptions = {
    continue: {
      handler: type => {
        if (type === "select") handlers.PAUSE()
      },
      label: "CONTINUE"
    },
    music: {
      handler: type => {
        console.log("music")
        // switch(type) {
        //   case "decrease": {
        //     if (settings.music > 0) setSetting({ ...settings, music: settings.music - 1})
        //   }
        //   case "increase": {
        //     if (settings.music < 10) setSetting(settings.music + 1)
        //   }
        // }
      },
      label: "MUSIC"
    },
    "new-game": {
      handler: type => {
        if (type === "select") handlers.RESTART()
      },
      label: "START A NEW GAME"
    },
    sound: {
      handler: type => {
        console.log("sound")
      },
      label: "SOUND EFFECTS"
    },
    theme: {
      handler: type => {
        console.log("theme")
      },
      label: "THEME"
    }
  }

  const {
    currentMenuOption,
    up: upMenu,
    down: downMenu,
    increase,
    decrease,
    select
  } = useMenu(menuOptions, (menuOption, actionType) =>
    menuOptions[menuOption as MenuOptionIds].handler(actionType)
  )

  const [joystickCollapsed, setJoystickCollapsed] = useState(true)
  const theme = getThemeByName(themeName)

  return (
    <ThemeContext.Provider value={theme}>
      <EmotionThemeProvider theme={theme}>
        <Container>
          {/* Use joystick arrow handlers and x y handlers for menu too */}
          <Overlay open={game.paused}>
            <React.Fragment>
              <MenuTitle label="SETTINGS" />
              {Object.keys(menuOptions).map((menuOption, idx) => (
                <MenuItem
                  selected={menuOption === currentMenuOption}
                  key={menuOption}
                  label={menuOptions[menuOption as MenuOptionIds].label}
                  value={(settings as any)[menuOption]}
                  onIncrease={() =>
                    menuOptions[menuOption as MenuOptionIds].handler("increase")
                  }
                  onDecrease={() =>
                    menuOptions[menuOption as MenuOptionIds].handler("decrease")
                  }
                  onSelect={() =>
                    menuOptions[menuOption as MenuOptionIds].handler("select")
                  }
                />
              ))}
            </React.Fragment>
          </Overlay>
          <GameContainer>
            <BoardContainer>
              <Indicators>
                <DebugContext.Consumer>
                  {isDebug => isDebug && <Label>Thicks: {game.ticks}</Label>}
                </DebugContext.Consumer>
                <Label accessibilityLabel="time">
                  Time: {game.durationInSeconds}
                </Label>
                <Label accessibilityLabel="lines">Lines: {game.lines}</Label>
                <Label accessibilityLabel="level">Level: {game.level}</Label>
              </Indicators>
              <BoardComponent joystickCollapsed={joystickCollapsed}>
                {game.board.lines.map((line, lineIndex) =>
                  line.map((box, boxIndex) => (
                    <BoxComponent
                      key={`${box.id}`}
                      box={box}
                      joystickCollapsed={joystickCollapsed}
                      line={lineIndex}
                      column={boxIndex}
                    />
                  ))
                )}
              </BoardComponent>
            </BoardContainer>
            <BoardContainer>
              {game.board.previewBoards.map(previewBoard => (
                <ShapePreview
                  key={`${previewBoard.id}`}
                  joystickCollapsed={joystickCollapsed}
                >
                  {previewBoard.lines.map((line, lineIndex) =>
                    line.map((box, boxIndex) => (
                      <BoxComponent
                        key={`${box.id}`}
                        box={box}
                        joystickCollapsed={joystickCollapsed}
                        line={lineIndex}
                        column={boxIndex}
                      />
                    ))
                  )}
                </ShapePreview>
              ))}
            </BoardContainer>
          </GameContainer>
          <ButtonComponent
            accessibilityLabel="toggle onscreen joystick"
            title="Onscreen joystick"
            onPress={() => setJoystickCollapsed(!joystickCollapsed)}
          />
          <Joystick
            down={(...args) => {
              game.paused ? downMenu() : handlers.DOWN.apply(null, args)
            }}
            left={(...args) => {
              game.paused ? decrease() : handlers.LEFT.apply(null, args)
            }}
            right={(...args) => {
              game.paused ? increase() : handlers.RIGHT.apply(null, args)
            }}
            select={handlers.RESTART}
            start={handlers.PAUSE}
            up={(...args) => {
              game.paused ? upMenu() : handlers.ROTATE.apply(null, args)
            }}
            x={(...args) => {
              game.paused ? select() : handlers.ROTATE.apply(null, args)
            }}
            y={(...args) => {
              game.paused ? select() : handlers.BLAST.apply(null, args)
            }}
            visible={!joystickCollapsed}
          />
        </Container>
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

const GameContainer = g(View)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
})

const Container = g(View)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 0
})

const BoardContainer = g(View)({
  alignItems: "center",
  display: "flex",
  flexDirection: "column"
})

const Indicators = g(View)({
  display: "flex",
  flexDirection: "row"
})

type LabelProps = { theme: Theme }

const Label = g(Text)<TextProps>({}, ({ theme }: LabelProps) => ({
  fontFamily: theme.fontFamily
}))

export default tetris
