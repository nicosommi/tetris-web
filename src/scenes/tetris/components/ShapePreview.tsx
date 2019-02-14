import { View } from "react-native"
import { g } from "../../../utils/view"

import { BOX_WIDTH, PREVIEW_LINE_LENGTH } from "../functions/settings"

const ShapePreview = g(View)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  width: BOX_WIDTH * PREVIEW_LINE_LENGTH
})

export default ShapePreview
