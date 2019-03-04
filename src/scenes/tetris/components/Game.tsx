import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { getThemeByName, ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

import { useTetris } from "../functions/hook"

import ButtonComponent from "../../joystick/components/Button"
import Joystick from "../../joystick/components/Joystick"
import MenuItem from "../../menu/components/MenuItem"
import MenuTitle from "../../menu/components/MenuTitle"
import Overlay from "../../menu/components/Overlay"
import useMenu from "../../menu/functions/hook"
import BoardComponent from "./Board"
import BoxComponent from "./Box"
import ShapePreview from "./ShapePreview"

const { useState } = React

type Props = {
  theme?: ThemeNames
}

type MenuOptionIds = "continue" | "new-game" | "music" | "sound" | "theme"
type MenuOptions = {
  id: MenuOptionIds
  label: string
}

const menuOptions: MenuOptions[] = [
  {
    id: "continue",
    label: "CONTINUE"
  },
  {
    id: "new-game",
    label: "START A NEW GAME"
  },
  {
    id: "music",
    label: "MUSIC"
  },
  {
    id: "sound",
    label: "SOUND EFFECTS"
  },
  {
    id: "theme",
    label: "THEME"
  }
]

type Settings = {
  music: boolean
  sound: boolean
  theme: ThemeNames
}

const tetris = ({ theme = "default" }: Props) => {
  // TODO: receive default configuration via parameter (initial game maybe)
  // e.g. change keyboard assignation, etc
  const [settings, setSetting] = useState<Settings>({
    music: false,
    sound: false,
    theme: "default"
  })

  const {
    currentMenuOptionIndex,
    up: upMenu,
    down: downMenu,
    increase,
    decrease,
    select
  } = useMenu(menuOptions, (menuOptionIndex, actionType) => {
    // TODO: change settings accordingly (reducer? useSettings?)
    const currentOption = menuOptions[menuOptionIndex]
    // true depends on the specific setting
    setSetting({ ...settings, [currentOption.id]: true })
  })

  const [game, handlers] = useTetris()

  const [joystickCollapsed, setJoystickCollapsed] = useState(true)

  return (
    <ThemeContext.Provider value={getThemeByName(theme)}>
      <Container>
        {/* Use joystick arrow handlers and x y handlers for menu too */}
        <Overlay open={game.paused}>
          <React.Fragment>
            <MenuTitle label="SETTINGS" />
            {menuOptions.map((menuOption, idx) => (
              <MenuItem
                selected={idx === currentMenuOptionIndex}
                key={menuOption.id}
                label={menuOption.label}
                value={
                  (settings as any)[menuOption.id]
                    ? (settings as any)[menuOption.id]
                    : undefined
                }
              />
            ))}
          </React.Fragment>
        </Overlay>
        <GameContainer>
          <BoardContainer>
            <Indicators>
              <DebugContext.Consumer>
                {isDebug => isDebug && <Text>Thicks: {game.ticks}</Text>}
              </DebugContext.Consumer>
              <Text accessibilityLabel="time">
                Time: {game.durationInSeconds}
              </Text>
              <Text accessibilityLabel="lines">Lines: {game.lines}</Text>
              <Text accessibilityLabel="level">Level: {game.level}</Text>
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

export default tetris
