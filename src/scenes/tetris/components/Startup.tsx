import { View } from "react-native"

import logoImage from "../../../assets/tetris.jpg"
import { orientationDependent } from "../../../utils/util"
import { g } from "../../../utils/view"

const Startup = g(View)(
  {
    alignItems: "center",
    backgroundImage: `url(${logoImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "100%",
    justifyContent: "center",
    left: 0,
    overflowX: "hidden",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1
  },
  () => orientationDependent({}, {})
)

export default Startup
