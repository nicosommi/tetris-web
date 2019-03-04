import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { getThemeByName, ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

import { useTetris } from "../functions/hook"

import ButtonComponent from "../../joystick/components/Button"
import Joystick from "../../joystick/components/Joystick"
import BoardComponent from "./Board"
import BoxComponent from "./Box"
import MenuItem from "./MenuItem"
import MenuTitle from "./MenuTitle"
import Overlay from "./Overlay"
import ShapePreview from "./ShapePreview"

const { useState } = React

type Props = {
  theme?: ThemeNames
}

type MenuOptionTypes = "continue" | "new-game" | "music" | "sound" | "theme"
type MenuOptions = {
  type: MenuOptionTypes
  label: string
}

const menuOptions: MenuOptions[] = [
  {
    label: "CONTINUE",
    type: "continue"
  },
  {
    label: "START A NEW GAME",
    type: "new-game"
  },
  {
    label: "MUSIC",
    type: "music"
  },
  {
    label: "SOUND EFFECTS",
    type: "sound"
  },
  {
    label: "THEME",
    type: "theme"
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
  const [currentMenuOptionIndex, setCurrentMenuOptionIndex] = useState(0)
  const [settings, setSetting] = useState<Settings>({
    music: false,
    sound: false,
    theme: "default"
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
                key={menuOption.type}
                label={menuOption.label}
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
            game.paused
              ? setCurrentMenuOptionIndex(
                  currentMenuOptionIndex < menuOptions.length - 1
                    ? currentMenuOptionIndex + 1
                    : 0
                )
              : handlers.DOWN.apply(null, args)
          }}
          left={handlers.LEFT}
          right={handlers.RIGHT}
          select={handlers.RESTART}
          start={handlers.PAUSE}
          up={(...args) => {
            game.paused
              ? setCurrentMenuOptionIndex(
                  currentMenuOptionIndex > 0
                    ? currentMenuOptionIndex - 1
                    : menuOptions.length - 1
                )
              : handlers.ROTATE.apply(null, args)
          }}
          x={handlers.ROTATE}
          y={handlers.BLAST}
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
