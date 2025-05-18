import { Suspense, lazy, useState } from 'react'
import { useEffectOnce } from 'react-use'

const QueryDevtoolsProduction = lazy(async () =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (moduleObject) => ({ default: moduleObject.ReactQueryDevtools }),
  ),
)

// press R+Q for several seconds to activate ReactQuery dev tools in production
// works only within 1st min after the load
export const QueryDevtoolsProductionHidden = (): React.JSX.Element | null => {
  const controller = new AbortController()

  const [showDevtools, setShowDevtools] = useState(false)

  let keysPressed: string[] = []

  const emptyKeysPressedArray = (): void => {
    keysPressed = []
  }

  const activateQueryDevTools = (event: KeyboardEvent): void => {
    keysPressed.push(event.key)

    if (keysPressed.includes('r') === false) {
      return
    }

    if (keysPressed.includes('q') === false) {
      return
    }

    const pressedLongEnough = keysPressed.length > 10

    if (pressedLongEnough === false) {
      return
    }

    setShowDevtools(true)
    keysPressed = []

    controller.abort('Query dev tools is enabled')
  }

  useEffectOnce(() => {
    window.addEventListener('keydown', activateQueryDevTools, {
      signal: controller.signal,
    })

    window.addEventListener('keyup', emptyKeysPressedArray, {
      signal: controller.signal,
    })

    // ? probably this part is not needed as it is not that good idea
    const oneMin = 60 * 1000

    setTimeout(() => {
      // Calling `.abort()` removes ALL event listeners associated with `controller.signal`
      controller.abort('Shortcut works only during first minute')
    }, oneMin)
  })

  if (showDevtools === false) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <QueryDevtoolsProduction />
    </Suspense>
  )
}
