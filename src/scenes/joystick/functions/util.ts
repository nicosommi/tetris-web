import { getViewportHeight, getViewportWidth } from "../../../utils/util"

export function kindDependent<T>(ifItIsSmall: T, ifElse: T): T {
  return getViewportWidth() < 400 || getViewportHeight() < 500
    ? ifItIsSmall
    : ifElse
}
