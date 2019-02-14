import { View } from "react-native"
import { g } from "../../../utils/view"

import { BOX_WIDTH, LINE_LENGTH } from "../functions/settings"

const BoardComponent = g(View)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  width: BOX_WIDTH * LINE_LENGTH
})

export default BoardComponent
