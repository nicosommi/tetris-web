import { View } from "react-native"
import { g } from "../../../utils/view"

import { BOARD_LENGTH, BOX_WIDTH, LINE_LENGTH } from "../functions/settings"

const BoardComponent = g(View)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  height: LINE_LENGTH * BOARD_LENGTH,
  width: BOX_WIDTH * LINE_LENGTH
})

export default BoardComponent
