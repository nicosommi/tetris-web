import ReactPlayer from "react-player"
import { isWeb } from "../../../utils/debug"
import { React } from "../../../utils/view"
import ErrorBoundary from "./ErrorBoundary"

const { useRef, useEffect } = React

type Props = {
  play: boolean
  url: string
  volume: number
}

const Effect = ({ play, url, volume }: Props) => {
  const effectComponentRef = useRef(null)

  // TODO: improve typings
  useEffect(() => {
    if (effectComponentRef.current && play === true) {
      ;((effectComponentRef.current! as ReactPlayer).getInternalPlayer() as any).play()
    }
  }, [play])

  return isWeb() ? (
    <ErrorBoundary>
      <ReactPlayer
        url={url}
        loop={false}
        height={0}
        ref={effectComponentRef}
        width={0}
        volume={volume}
      />
    </ErrorBoundary>
  ) : null
}

export default Effect
