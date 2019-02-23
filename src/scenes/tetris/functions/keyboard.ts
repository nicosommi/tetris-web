import { throttle } from "lodash"
import { useEffect } from "react"
import { isWeb } from "../../../utils/debug"

const throttledListener = throttle(
  (keyHandlers: KeyCodeHandler[], e: KeyboardEvent) => {
    const filteredHandlers = keyHandlers
      .filter(({ keys }) =>
        keys.find(k => String(k) === e.key) !== undefined ? true : false
      )
      .map(keyHandler => ({ keyHandler, e }))
    filteredHandlers.forEach(({ keyHandler, e: currentEvent }) =>
      keyHandler.handler(currentEvent.key, e)
    )
  },
  250
)

/**
 * Search your keys here (not typed yet):
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */
export function useKeyDowns(keyHandlers: UseKeyDownsArgs) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => throttledListener(keyHandlers, e)
    if (isWeb()) {
      window.addEventListener("keydown", listener)
    }
    return () =>
      isWeb() ? window.removeEventListener("keydown", listener) : undefined
  })
}
