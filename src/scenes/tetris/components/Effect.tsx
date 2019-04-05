import { isWeb } from "../../../utils/debug"
import { React } from "../../../utils/view"
import ErrorBoundary from "./ErrorBoundary"

const { useRef, useEffect } = React

type Props = {
  play: boolean
  smokePlay: boolean
  url: string
}

const Effect = ({ play, smokePlay, url }: Props) => {
  const effectComponentRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (effectComponentRef.current && play === true) {
      effectComponentRef.current.play()
    }
    if (effectComponentRef.current && smokePlay === true) {
      effectComponentRef.current.play()
      effectComponentRef.current.pause()
    }
  }, [play, smokePlay])

  return isWeb() ? (
    <ErrorBoundary>
      {isWeb() && <audio ref={effectComponentRef} src={url} loop={false} />}
    </ErrorBoundary>
  ) : null
}

export default Effect
