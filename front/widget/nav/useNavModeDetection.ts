/* eslint-disable react-hooks/set-state-in-effect */
import { type NavMode, navSlice } from '@entity/nav/navSlice'
import { dispatch, useSelector } from '@shared/lib/redux'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const useNavModeDetection = (): React.RefObject<HTMLElement | null> => {
  const navRef = useRef<HTMLElement | null>(null)
  const navStructure = useSelector((state) => state.nav.navStructure)
  const [localMode, setLocalMode] = useState<NavMode>('full')
  const [resizeCounter, setResizeCounter] = useState(0)

  useLayoutEffect(() => {
    dispatch(navSlice.actions.setNavMode({ mode: 'full' }))
    setLocalMode('full')
    setResizeCounter((counter) => counter + 1)
  }, [navStructure])

  useLayoutEffect(() => {
    const nav = navRef.current

    if (nav === null) {
      return
    }

    nav.dataset.navMode = localMode

    const shouldStepDown =
      nav.scrollWidth > nav.clientWidth && localMode !== 'hamburger'

    if (shouldStepDown === true) {
      if (localMode === 'full') {
        setLocalMode('text-only')
      } else if (localMode === 'text-only') {
        setLocalMode('icons-only')
      } else if (localMode === 'icons-only') {
        setLocalMode('hamburger')
      } else {
        setLocalMode('hamburger')
      }
    }

    dispatch(navSlice.actions.setNavMode({ mode: localMode }))
  }, [localMode, resizeCounter])

  useEffect(() => {
    const nav = navRef.current

    if (nav === null) {
      return
    }

    const observer = new ResizeObserver(() => {
      dispatch(navSlice.actions.setNavMode({ mode: 'full' }))
      setLocalMode('full')
      setResizeCounter((counter) => counter + 1)
    })

    observer.observe(nav)

    return (): void => {
      observer.disconnect()
    }
  }, [])

  return navRef
}
