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

import JoystickButton from "../../../components/JoystickButton"
import { kindDependent } from "../../../utils/util"
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
    grid: false,
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
        const sound = !settings.sound
        setSetting({ ...settings, sound })
        setSmokeTestEffects(sound)
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
  const [infoShown, showInfo] = useState(false)
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
          play={(settings.sound && game.lastEatenLines > 0) || smokeTestEffects}
        />
        <Container>
          {/* Use joystick arrow handlers and x y handlers for menu too */}
          <Overlay open={game.paused && !infoShown}>
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
              <WallHole>
                <DebugContext.Consumer>
                  {isDebug => isDebug && <Label>Thicks: {game.ticks}</Label>}
                </DebugContext.Consumer>
                <Label accessibilityLabel="time">Time</Label>
                <Label accessibilityLabel={String(game.durationInSeconds)}>
                  {game.durationInSeconds}
                </Label>
              </WallHole>
              <WallHole>
                <Label accessibilityLabel="lines">Lines</Label>
                <Label accessibilityLabel={String(game.lines)}>
                  {game.lines}
                </Label>
              </WallHole>
              <WallHole>
                <Label accessibilityLabel="level">Level</Label>
                <Label accessibilityLabel={String(game.level)}>
                  {game.level}
                </Label>
              </WallHole>
              <WallHole>
                <JoystickButton
                  accessibilityLabel="toggle onscreen joystick"
                  title={`PAD ${joystickCollapsed ? "\u25B2" : "\u25BC"}`}
                  onPress={() => setJoystickCollapsed(!joystickCollapsed)}
                />
              </WallHole>
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
              <WallHole>
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
              </WallHole>
              <Overlay open={infoShown}>
                <MenuContent>
                  <MenuTitle label="INFO" />
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
                  <MenuItem
                    selected={true}
                    label="BACK"
                    onSelect={() => showInfo(false)}
                  />
                </MenuContent>
              </Overlay>
            </WallComponent>
          </Panel>
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
            select={(...args) => {
              showInfo(!infoShown)
              if (!infoShown && !game.paused) handlers.PAUSE.apply(null, args)
            }}
            start={(...args) => {
              if (infoShown) showInfo(!infoShown)
              if (!game.paused) handlers.PAUSE.apply(null, args)
            }}
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
    justifyContent: "center"
  },
  ({ theme }: ThemeProps) => ({
    backgroundColor: theme.panel.backgroundColor,
    borderColor: theme.panel.borderColor,
    flexDirection: kindDependent("column", "row")
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

const Info = g(View)<ViewProps>(
  {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: 10
  },
  ({ theme }: ThemeProps) => ({
    backgroundColor: theme.wall.backgroundColor
  })
)

type ThemeProps = { theme: Theme }

const WallHole = g(View)<ViewProps>(
  {
    alignItems: "center",
    display: "flex",
    marginTop: 10,
    padding: 10
  },
  ({ theme }: ThemeProps) => ({
    backgroundColor: theme.box.backgroundColor,
    borderColor: theme.wall.borderColor,
    borderWidth: 3,
    flexDirection: kindDependent("row", "column")
  })
)

type LabelProps = { small?: boolean }

const Label = g(Text, {
  shouldForwardProp: prop => prop !== "small"
})<TextProps & LabelProps>({}, ({ small, theme }: LabelProps & ThemeProps) => ({
  color: theme.color,
  fontFamily: theme.fontFamily,
  fontSize: small ? kindDependent(6, 12) : kindDependent(10, 20)
}))

export default tetris
