import { throttle } from "lodash"
import { useEffect } from "react"
import { isWeb } from "../../../utils/debug"

type FilteredHandler = {
  keyHandler: KeyCodeHandler
  e: KeyboardEvent
}

const filterHandlers = (
  keyHandlers: KeyCodeHandler[],
  e: KeyboardEvent
): FilteredHandler[] => {
  const filteredHandlers = keyHandlers
    .filter(({ keys }) =>
      keys.find(k => String(k) === e.key) !== undefined ? true : false
    )
    .map(keyHandler => ({ keyHandler, e }))
  return filteredHandlers
}

const runHandlers = throttle(
  (keyEventHandlers: FilteredHandler[], e: KeyboardEvent) => {
    keyEventHandlers.forEach(({ keyHandler, e: currentEvent }) => {
      keyHandler.handler(currentEvent.key, e)
    })
  },
  250
)

/**
 * Search your keys here (not typed yet):
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */
export function useKeyDowns(keyHandlers: UseKeyDownsArgs) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const fh = filterHandlers(keyHandlers, e)
      if (fh.length > 0) {
        runHandlers(fh, e)
      }
    }
    if (isWeb()) {
      window.addEventListener("keydown", listener)
    }
    return () =>
      isWeb() ? window.removeEventListener("keydown", listener) : undefined
  }, [])
}
