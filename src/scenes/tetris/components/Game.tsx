import { Text, TextProps, View } from "react-native"
import ReactPlayer from "react-player"
import { DebugContext, isWeb } from "../../../utils/debug"
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
import { themes } from "../functions/settings"
import BoardComponent from "./Board"
import BoxComponent from "./Box"
import Effect from "./Effect"
import ShapePreview from "./ShapePreview"

const { useState } = React

type MenuOptionIds = "continue" | "new-game" | "music" | "sound" | "theme"
type MenuOptions = {
  [key in MenuOptionIds]: {
    handler: (type: MenuActionType) => void
    label: string
  }
}

type Settings = {
  music: boolean
  musicVolume: number
  sound: boolean
  soundVolume: number
  theme: ThemeNames
}

const tetris = () => {
  const [settings, setSetting] = useState<Settings>({
    music: false,
    musicVolume: 0.6,
    sound: false,
    soundVolume: 1,
    theme: "default"
  })

  const [game, handlers] = useTetris()

  // tslint:disable:object-literal-sort-keys
  const menuOptions: MenuOptions = {
    continue: {
      handler: type => {
        if (type === "select") handlers.PAUSE()
      },
      label: "CONTINUE"
    },
    "new-game": {
      handler: type => {
        if (type === "select") handlers.RESTART()
      },
      label: "START A NEW GAME"
    },
    music: {
      handler: () => {
        setSetting({ ...settings, music: !settings.music })
      },
      label: "MUSIC"
    },
    sound: {
      handler: () => {
        setSetting({ ...settings, sound: !settings.sound })
      },
      label: "SOUND EFFECTS"
    },
    theme: {
      handler: type => {
        const currentIndex = themes.findIndex(t => t.name === settings.theme)
        let nextIndex = currentIndex - 1
        if (type === "increase" || type === "select")
          nextIndex = currentIndex + 1
        if (themes[nextIndex])
          setSetting({ ...settings, theme: themes[nextIndex].name })
      },
      label: "THEME"
    }
  }
  // tslint:enable:object-literal-sort-keys

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
  const theme = getThemeByName(settings.theme)

  return (
    <ThemeContext.Provider value={theme}>
      <EmotionThemeProvider theme={theme}>
        {isWeb() && (
          <ReactPlayer
            url={`${process.env.PUBLIC_URL}/assets/music/01.mp3`}
            height={0}
            loop
            playing={settings.music}
            volume={settings.musicVolume}
            width={0}
          />
        )}
        <Effect
          volume={settings.soundVolume}
          play={settings.sound && game.lastEatenLines > 0}
        />
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
