import { navSlice } from '@entity/nav/navSlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import { useLayoutEffect, useRef } from 'react'
import { useWindowSize } from 'react-use'

export const useNavModeDetection = (): React.RefObject<HTMLElement | null> => {
  const navRef = useRef<HTMLElement | null>(null)
  const navStructure = useSelector((state) => state.nav.navStructure)
  const navMode = useSelector((state) => state.nav.navMode)
  const windowSize = useWindowSize()

  useLayoutEffect(() => {
    dispatch(navSlice.actions.setNavMode({ mode: 'full' }))
  }, [windowSize.width, navStructure])

  useLayoutEffect(() => {
    const nav = navRef.current

    if (nav === null) {
      return
    }

    nav.dataset.navMode = navMode

    const shouldStepDown =
      nav.scrollWidth > nav.clientWidth && navMode !== 'hamburger'

    if (shouldStepDown === true) {
      if (navMode === 'full') {
        dispatch(navSlice.actions.setNavMode({ mode: 'text-only' }))
      } else if (navMode === 'text-only') {
        dispatch(navSlice.actions.setNavMode({ mode: 'icons-only' }))
      } else if (navMode === 'icons-only') {
        dispatch(navSlice.actions.setNavMode({ mode: 'hamburger' }))
      } else {
        dispatch(navSlice.actions.setNavMode({ mode: 'hamburger' }))
      }
    }
  }, [navMode, windowSize.width, navStructure])

  return navRef
}
