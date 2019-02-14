import { createBoard } from "./board"
import { chance } from "./util"

export function createGame(previous?: Game): Game {
  const c = chance()
  return {
    board: createBoard(),
    gameOver: false,
    id: c.guid({ version: 4 }),
    level: 1,
    lines: 0,
    previous,
    score: 0,
    ticks: 0
  }
}
