import { useState } from "react"

export type MenuActionType = "increase" | "decrease" | "select"

export default function useMenu(
  menuOptions: object,
  handler: (menuOption: string, type: MenuActionType) => void
) {
  const keys = Object.keys(menuOptions)
  const [currentMenuOptionIndex, setCurrentMenuOptionIndex] = useState(0)

  const up = () =>
    setCurrentMenuOptionIndex(
      currentMenuOptionIndex > 0 ? currentMenuOptionIndex - 1 : keys.length - 1
    )

  const down = () => {
    setCurrentMenuOptionIndex(
      currentMenuOptionIndex < keys.length - 1 ? currentMenuOptionIndex + 1 : 0
    )
  }

  const increase = () => handler(keys[currentMenuOptionIndex], "increase")
  const decrease = () => handler(keys[currentMenuOptionIndex], "decrease")
  const select = () => handler(keys[currentMenuOptionIndex], "select")

  return {
    currentMenuOption: keys[currentMenuOptionIndex],
    decrease,
    down,
    increase,
    select,
    up
  }
}
