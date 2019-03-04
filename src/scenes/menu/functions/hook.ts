import { useState } from "react"

export default function useMenu(
  menuOptions: Array<unknown>,
  handler: (index: number, type: "increase" | "decrease" | "select") => void
) {
  const [currentMenuOptionIndex, setCurrentMenuOptionIndex] = useState(0)

  const up = () =>
    setCurrentMenuOptionIndex(
      currentMenuOptionIndex > 0
        ? currentMenuOptionIndex - 1
        : menuOptions.length - 1
    )

  const down = () => {
    setCurrentMenuOptionIndex(
      currentMenuOptionIndex < menuOptions.length - 1
        ? currentMenuOptionIndex + 1
        : 0
    )
  }

  const increase = () => handler(currentMenuOptionIndex, "increase")
  const decrease = () => handler(currentMenuOptionIndex, "decrease")
  const select = () => handler(currentMenuOptionIndex, "select")

  return { up, down, increase, decrease, select, currentMenuOptionIndex }
}
