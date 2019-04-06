import { isWeb } from "../../../utils/debug"
import { React } from "../../../utils/view"
import ErrorBoundary from "./ErrorBoundary"

const { useRef, useLayoutEffect } = React

type Props = {
  play: boolean
  smokePlay: boolean
  url: string
}

const Effect = ({ play, smokePlay, url }: Props) => {
  const effectComponentRef = useRef<HTMLAudioElement>(null)

  useLayoutEffect(() => {
    if (effectComponentRef.current && play === true) {
      effectComponentRef.current.play()
    } else if (effectComponentRef.current && smokePlay === true) {
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
