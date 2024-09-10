import { Suspense, lazy, useState } from 'react'
import { useEffectOnce } from 'react-use'

const ReactQueryDevtoolsProduction = lazy(async () =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({ default: d.ReactQueryDevtools }),
  ),
)

// press R+Q for several seconds to activate ReactQuery dev tools in production
// works only within 1st min after the load
export const ReactQueryDevtoolsProductionHidden = (): JSX.Element | null => {
  const [showDevtools, setShowDevtools] = useState(false)

  let keysPressed: string[] = []

  const emptyKeysPressedArray = (): void => {
    keysPressed = []
  }

  const activateReactQueryDevTools = (e: KeyboardEvent): void => {
    if (!e.key) return
    keysPressed.push(e.key)
    if (!keysPressed.includes('r')) return
    if (!keysPressed.includes('q')) return
    const pressedLongEnough = keysPressed.length > 10
    if (!pressedLongEnough) return
    setShowDevtools(true)
    keysPressed = []
    window.removeEventListener('keydown', activateReactQueryDevTools)
    window.removeEventListener('keyup', emptyKeysPressedArray)
  }

  useEffectOnce(() => {
    window.addEventListener('keydown', activateReactQueryDevTools)
    window.addEventListener('keyup', emptyKeysPressedArray)

    // ? probably this part is not needed as it is not that good idea
    const oneMin = 60 * 1000
    setTimeout(() => {
      window.removeEventListener('keydown', activateReactQueryDevTools)
      window.removeEventListener('keydown', emptyKeysPressedArray)
    }, oneMin)
  })

  if (!showDevtools) return null

  return (
    <Suspense fallback={null}>
      <ReactQueryDevtoolsProduction />
    </Suspense>
  )
}
