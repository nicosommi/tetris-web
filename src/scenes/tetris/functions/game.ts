import { createBoard } from "./board"
import { GAME_THICK_INTERVAL } from "./settings"
import { chance } from "./util"

export function getLevelForLines(lines: number): number {
  return Math.floor(lines / 5) + 1
}

export function getTickForLevel(level: number): number {
  switch (true) {
    case level === 1:
      return 650
    case level === 2:
      return 500
    case level === 3:
      return 350
    case level === 4:
      return 200
    case level === 5:
      return 80
    default:
      return GAME_THICK_INTERVAL / (level + 4)
  }
}

export function createGame(previous?: Game): Game {
  const c = chance()
  return {
    board: createBoard(),
    durationInSeconds: 0,
    gameOver: false,
    id: c.guid({ version: 4 }),
    level: 1,
    lines: 0,
    paused: false,
    previous,
    score: 0,
    ticks: 0
  }
}
