import { View } from "react-native"
import { g } from "../../../utils/view"

import { getBoardHeight, getBoardWidth } from "../functions/util"

const BoardComponent = g(View)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  height: getBoardHeight(),
  width: getBoardWidth()
})

export default BoardComponent
