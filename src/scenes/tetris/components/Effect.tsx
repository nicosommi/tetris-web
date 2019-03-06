import Sound, { PlayStatus } from "react-sound"
import { isWeb } from "../../../utils/debug"
import { React } from "../../../utils/view"
import ErrorBoundary from "./ErrorBoundary"

type Props = {
  play: boolean
  volume: number
  url: string
}

const Effect = ({ url, play, volume }: Props) => {
  return isWeb() ? (
    <ErrorBoundary>
      <Sound
        url={url}
        playStatus={(play ? "PLAYING" : "STOPPED") as PlayStatus}
        loop={false}
        volume={volume * 100}
      />
    </ErrorBoundary>
  ) : null
}

export default Effect
