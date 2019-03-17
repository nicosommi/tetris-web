import { isWeb } from "../../../utils/debug"
import { React } from "../../../utils/view"
import ErrorBoundary from "./ErrorBoundary"

const { useRef, useEffect } = React

type Props = {
  play: boolean
  url: string
}

const Effect = ({ play, url }: Props) => {
  const effectComponentRef = useRef<HTMLAudioElement>(null)

  // TODO: improve typings
  useEffect(() => {
    if (effectComponentRef.current && play === true) {
      effectComponentRef.current.play()
    }
  }, [play])

  return isWeb() ? (
    <ErrorBoundary>
      {isWeb() && <audio ref={effectComponentRef} src={url} loop={false} />}
    </ErrorBoundary>
  ) : null
}

export default Effect
