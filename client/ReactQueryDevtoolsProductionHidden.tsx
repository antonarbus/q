import { Suspense, lazy, useState } from 'react'

import { useEffectOnce } from 'react-use'
const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({ default: d.ReactQueryDevtools })
  )
)

// press R+Q for several seconds to activate ReactQuery dev tools in production
// works only within 1st min after the load
export const ReactQueryDevtoolsProductionHidden = () => {
  const [showDevtools, setShowDevtools] = useState(false)

  let keysPressed: string[] = []

  const activateReactQueryDevTools = (e: KeyboardEvent) => {
    if (!e.key) return
    keysPressed.push(e.key)
    if (!keysPressed.includes('r')) return
    if (!keysPressed.includes('q')) return
    const rqPressedLongEnough = keysPressed.length > 10
    if (!rqPressedLongEnough) return
    setShowDevtools(true)
    keysPressed = []
    window.removeEventListener('keydown', activateReactQueryDevTools)
    window.removeEventListener('keydown', emptyKeysPressedArray)
  }

  const emptyKeysPressedArray = () => {
    keysPressed = []
  }

  useEffectOnce(() => {
    window.addEventListener('keydown', activateReactQueryDevTools)
    window.addEventListener('keyup', emptyKeysPressedArray)

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
