import { Text, View } from "react-native"
import { animated, useSpring } from "react-spring"
import { DebugContext } from "../../../utils/debug"
import { getThemeByName, ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

import { useTetris } from "../functions/hook"

import ButtonComponent from "../../joystick/components/Button"
import Joystick from "../../joystick/components/Joystick"
import BoardComponent from "./Board"
import BoxComponent from "./Box"
import ShapePreview from "./ShapePreview"

const { useState } = React

type Props = {
  theme?: ThemeNames
}

const tetris = ({ theme = "default" }: Props) => {
  // TODO: receive default configuration via parameter (initial game maybe)
  // e.g. change keyboard assignation, etc
  const [game, duration, handlers] = useTetris()

  const [joystickCollapsed, setJoystickCollapsed] = useState(true)

  const joystickHandlers: JoystickCommands = {
    down: handlers.DOWN,
    left: handlers.LEFT,
    right: handlers.RIGHT,
    select: handlers.RESTART,
    start: handlers.PAUSE,
    up: handlers.ROTATE,
    x: handlers.ROTATE,
    y: handlers.BLAST
  }

  const { show } = useSpring({ show: "100%", from: { show: "0%" } })

  const AniOverlay = animated(Overlay)

  return (
    <ThemeContext.Provider value={getThemeByName(theme)}>
      <Container>
        <AniOverlay show={game.paused === true ? show : "0%"} />
        <GameContainer>
          <BoardContainer>
            <Indicators>
              <DebugContext.Consumer>
                {isDebug => isDebug && <Text>Thicks: {game.ticks}</Text>}
              </DebugContext.Consumer>
              <Text accessibilityLabel="time">Time: {duration}</Text>
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
        <Joystick handlers={joystickHandlers} visible={!joystickCollapsed} />
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

type OverlayProps = {
  show: string
}

const Overlay = g(View)(
  {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    left: 0,
    overflowX: "hidden",
    position: "fixed",
    top: 0,
    zIndex: 1
  },
  ({ show }: OverlayProps) => ({
    height: show,
    width: show
  })
)

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
