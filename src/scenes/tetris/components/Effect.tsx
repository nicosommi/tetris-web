import ReactPlayer from "react-player"
import { isWeb } from "../../../utils/debug"
import { React } from "../../../utils/view"
import ErrorBoundary from "./ErrorBoundary"

const { useRef } = React

const prefixUrl = process.env.PUBLIC_URL

type Props = {
  play: boolean
  volume: number
}

const Effect = ({ play, volume }: Props) => {
  const lineEat1 = useRef(null)

  if (lineEat1.current && play) {
    // ;(lineEat1.current! as ReactPlayer).seekTo(0)
    ;((lineEat1.current! as ReactPlayer).getInternalPlayer() as any).play()
  }

  return isWeb() ? (
    <ErrorBoundary>
      <ReactPlayer
        url={`${prefixUrl}/assets/sound/tetris-effects-line-eat-1x.mp3`}
        loop={false}
        height={0}
        width={0}
        volume={volume}
        ref={lineEat1}
      />
    </ErrorBoundary>
  ) : null
}

export default Effect
