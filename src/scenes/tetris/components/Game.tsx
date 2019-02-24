import { Text, View } from "react-native"
import { DebugContext } from "../../../utils/debug"
import { getThemeByName, ThemeContext } from "../../../utils/theme"
import { g, React } from "../../../utils/view"

import { useTetris } from "../functions/hook"

import Joystick from "../../joystick/components/Joystick"
import BoardComponent from "./Board"
import BoxComponent from "./Box"
import ShapePreview from "./ShapePreview"

type Props = {
  theme?: ThemeNames
}

const tetris = ({ theme = "default" }: Props) => {
  // TODO: receive default configuration via parameter (initial game maybe)
  // e.g. change keyboard assignation, etc
  const [game, duration, handlers] = useTetris()

  const joystickHandlers: JoystickCommands = {
    down: handlers.DOWN,
    left: handlers.LEFT,
    right: handlers.RIGHT,
    select: handlers.RESTART,
    start: handlers.PAUSE,
    up: () => undefined,
    x: handlers.ROTATE,
    y: handlers.BLAST
  }

  return (
    <ThemeContext.Provider value={getThemeByName(theme)}>
      <Container>
        <BoardContainer>
          <Indicators>
            <DebugContext.Consumer>
              {isDebug => isDebug && <Text>Thicks: {game.ticks}</Text>}
            </DebugContext.Consumer>
            <Text accessibilityLabel="time">Time: {duration}</Text>
            <Text accessibilityLabel="lines">Lines: {game.lines}</Text>
            <Text accessibilityLabel="level">Level: {game.level}</Text>
          </Indicators>
          <Joystick handlers={joystickHandlers} />
          <BoardComponent>
            {game.board.lines.map((line, lineIndex) =>
              line.map((box, boxIndex) => (
                <BoxComponent
                  key={`${box.id}`}
                  box={box}
                  line={lineIndex}
                  column={boxIndex}
                />
              ))
            )}
          </BoardComponent>
        </BoardContainer>
        <BoardContainer>
          {game.board.previewBoards.map(previewBoard => (
            <ShapePreview key={`${previewBoard.id}`}>
              {previewBoard.lines.map((line, lineIndex) =>
                line.map((box, boxIndex) => (
                  <BoxComponent
                    key={`${box.id}`}
                    box={box}
                    line={lineIndex}
                    column={boxIndex}
                  />
                ))
              )}
            </ShapePreview>
          ))}
        </BoardContainer>
      </Container>
    </ThemeContext.Provider>
  )
}

const Container = g(View)({
  display: "flex",
  flexDirection: "row"
})

const BoardContainer = g(View)({
  display: "flex",
  flexDirection: "column"
})

const Indicators = g(View)({
  display: "flex",
  flexDirection: "row"
})

export default tetris
