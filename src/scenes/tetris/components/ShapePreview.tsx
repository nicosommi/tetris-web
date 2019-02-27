import { View } from "react-native"
import { g } from "../../../utils/view"

import { PREVIEW_LINE_LENGTH } from "../functions/settings"
import { getBoxMaxSide } from "../functions/util"

type Props = {
  joystickCollapsed: boolean
}

const ShapePreview = g(View)(
  {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  ({ joystickCollapsed }: Props) => ({
    width: getBoxMaxSide(joystickCollapsed) * PREVIEW_LINE_LENGTH
  })
)

export default ShapePreview
