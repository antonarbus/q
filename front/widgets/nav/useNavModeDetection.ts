import { navSlice } from '@front/entities/nav/navSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { useLayoutEffect, useRef } from 'react'
import { useWindowSize } from 'react-use'

export const useNavModeDetection = (): React.RefObject<HTMLElement | null> => {
  const navRef = useRef<HTMLElement | null>(null)

  const navStructure = reduxHolder.useSelector((state) => state.nav.navStructure)

  const navMode = reduxHolder.useSelector((state) => state.nav.navMode)
  const windowSize = useWindowSize()

  useLayoutEffect(() => {
    reduxHolder.dispatch(navSlice.actions.setNavMode({ mode: 'full' }))
  }, [windowSize.width, navStructure])

  useLayoutEffect(() => {
    const nav = navRef.current

    if (nav === null) {
      return
    }

    nav.dataset.navMode = navMode

    const shouldStepDown = nav.scrollWidth > nav.clientWidth && navMode !== 'hamburger'

    if (shouldStepDown === true) {
      if (navMode === 'full') {
        reduxHolder.dispatch(navSlice.actions.setNavMode({ mode: 'text-only' }))
      } else if (navMode === 'text-only') {
        reduxHolder.dispatch(navSlice.actions.setNavMode({ mode: 'icons-only' }))
      } else if (navMode === 'icons-only') {
        reduxHolder.dispatch(navSlice.actions.setNavMode({ mode: 'hamburger' }))
      } else {
        reduxHolder.dispatch(navSlice.actions.setNavMode({ mode: 'hamburger' }))
      }
    }
  }, [navMode, windowSize.width, navStructure])

  return navRef
}
