import { View } from "react-native"

import { g } from "../../../utils/view"

const GameOver = g(View)(
  {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: "100%",
    left: 0,
    overflowX: "hidden",
    position: "fixed",
    top: 0,
    transition: "height 0.5s",
    width: "100%",
    zIndex: 1
  },
  () => ({})
)

export default GameOver
