import { View } from "react-native"
import { g } from "../../../utils/view"

import { getBoardHeight, getBoardWidth } from "../functions/util"

type Props = {
  joystickCollapsed: boolean
}

const BoardComponent = g(View)(
  {
    borderWidth: 1,
    boxSizing: "content-box",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  ({ joystickCollapsed }: Props) => ({
    height: getBoardHeight(joystickCollapsed),
    width: getBoardWidth(joystickCollapsed)
  })
)

export default BoardComponent
