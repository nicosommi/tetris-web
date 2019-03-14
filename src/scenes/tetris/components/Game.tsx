import { Text, TextProps, View, ViewProps } from "react-native"
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
import MenuContent from "../../menu/components/MenuContent"
import MenuItem from "../../menu/components/MenuItem"
import MenuTitle from "../../menu/components/MenuTitle"
import Overlay from "../../menu/components/Overlay"
import useMenu, { MenuActionType } from "../../menu/functions/hook"
import { SHAPE_QUEUE_LENGTH, themes } from "../functions/settings"
import BoardComponent from "./Board"
import BoxComponent from "./Box"
import Effect from "./Effect"
import ShapePreview from "./ShapePreview"
import WallComponent from "./Wall"

const { useState, useEffect } = React

type MenuOptionIds =
  | keyof Pick<Settings, "grid" | "music" | "sound" | "theme">
  | "continue"
  | "new-game"
type MenuOptions = {
  [key in MenuOptionIds]: {
    handler: (type: MenuActionType) => void
    label: string
  }
}

type Settings = {
  grid: boolean
  music: boolean
  musicVolume: number
  sound: boolean
  soundVolume: number
  theme: ThemeNames
}

const tetris = () => {
  const [settings, setSetting] = useState<Settings>({
    grid: true,
    music: false,
    musicVolume: 0.6,
    sound: false,
    soundVolume: 1,
    theme: "default"
  })

  const [smokeTestEffects, setSmokeTestEffects] = useState(false)
  useEffect(() => {
    setSmokeTestEffects(false)
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
    grid: {
      handler: () => {
        setSetting({ ...settings, grid: !settings.grid })
      },
      label: "GRID"
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
        setSmokeTestEffects(true)
      },
      label: "SOUND EFFECTS"
    },
    theme: {
      handler: type => {
        const currentIndex = themes.findIndex(t => t.name === settings.theme)
        let nextIndex = currentIndex - 1
        if (type === "increase" || type === "select")
          nextIndex = currentIndex + 1 < themes.length ? currentIndex + 1 : 0
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
            url={theme.music}
            height={0}
            loop
            playing={settings.music}
            volume={settings.musicVolume}
            width={0}
          />
        )}
        <Effect
          url={theme.sounds.lineEat}
          volume={smokeTestEffects ? 0 : settings.soundVolume}
          play={(settings.sound && game.lastEatenLines > 0) || smokeTestEffects}
        />
        <Container>
          {/* Use joystick arrow handlers and x y handlers for menu too */}
          <Overlay open={game.paused}>
            <MenuContent>
              <MenuTitle label="SETTINGS" />
              {Object.entries(menuOptions).map(([key, value]) => (
                <MenuItem
                  selected={key === currentMenuOption}
                  key={key}
                  label={value.label}
                  value={settings[key as keyof Settings]}
                  onIncrease={() => value.handler("increase")}
                  onDecrease={() => value.handler("decrease")}
                  onSelect={() => value.handler("select")}
                />
              ))}
            </MenuContent>
          </Overlay>
          <Panel>
            <WallComponent>
              <DebugContext.Consumer>
                {isDebug => isDebug && <Label>Thicks: {game.ticks}</Label>}
              </DebugContext.Consumer>
              <Label accessibilityLabel="time">Time</Label>
              <Label accessibilityLabel={String(game.durationInSeconds)}>
                {game.durationInSeconds}
              </Label>
              <Label accessibilityLabel="lines">Lines</Label>
              <Label accessibilityLabel={String(game.lines)}>
                {game.lines}
              </Label>
              <Label accessibilityLabel="level">Level</Label>
              <Label accessibilityLabel={String(game.level)}>
                {game.level}
              </Label>
            </WallComponent>
            <BoardContainer>
              <BoardComponent joystickCollapsed={joystickCollapsed}>
                {game.board.lines.map((line, lineIndex) =>
                  line.map((box, boxIndex) => (
                    <BoxComponent
                      key={`${box.id}`}
                      box={box}
                      joystickCollapsed={joystickCollapsed}
                      line={lineIndex}
                      column={boxIndex}
                      grid={settings.grid}
                    />
                  ))
                )}
              </BoardComponent>
            </BoardContainer>
            <WallComponent>
              {game.board.previewBoards
                .slice(0, SHAPE_QUEUE_LENGTH - 1)
                .map(previewBoard => (
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
                          grid={settings.grid}
                        />
                      ))
                    )}
                  </ShapePreview>
                ))}
              <Info>
                <Label small>COMMANDS</Label>
                <Label small>ROT: X or UP</Label>
                <Label small>BLAST: Y</Label>
                <Label small>ACC: DOWN</Label>
                <Label small>PAUSE: START</Label>
                <Label small>NEW: SELECT</Label>
              </Info>
              <Info>
                <Label small>Keyboard</Label>
                <Label small>wasd or arrows</Label>
                <Label small>jk or zx</Label>
                <Label small>ENTER</Label>
                <Label small>SPACE</Label>
              </Info>
            </WallComponent>
          </Panel>
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

const Panel = g(View)<ViewProps>(
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  ({ theme }: ThemeProps) => ({
    backgroundColor: theme.panel.backgroundColor,
    borderColor: theme.panel.borderColor
  })
)

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

const Info = g(View)({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  marginTop: 10
})

type ThemeProps = { theme: Theme }

type LabelProps = { small?: boolean }

const Label = g(Text, {
  shouldForwardProp: prop => prop !== "small"
})<TextProps & LabelProps>({}, ({ small, theme }: LabelProps & ThemeProps) => ({
  color: theme.color,
  fontFamily: theme.fontFamily,
  fontSize: small ? 12 : 20
}))

export default tetris
