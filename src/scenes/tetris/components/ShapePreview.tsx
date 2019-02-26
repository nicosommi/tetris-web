import { View } from "react-native"
import { g } from "../../../utils/view"

import { PREVIEW_LINE_LENGTH } from "../functions/settings"
import { getBoxMaxSide } from "../functions/util"

const ShapePreview = g(View)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  width: getBoxMaxSide() * PREVIEW_LINE_LENGTH
})

export default ShapePreview
