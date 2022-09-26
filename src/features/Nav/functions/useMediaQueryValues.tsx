import { useLayoutEffect } from 'react'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@src/store'
import { disableMedia, enableMedia, setNavMediaQueryWidths } from '../navSlice'
import { calcNavMediaQueryParams } from './calcNavMediaQueryParams'
import { useFirstMountState } from 'react-use'

type Props = {
  navRef: React.MutableRefObject<HTMLDivElement>
  logoRef: React.MutableRefObject<HTMLDivElement>
}

export function useMediaQueryValues({ navRef, logoRef }: Props) {
  const dispatch = useDispatchTyped()
  const isFirstMount = useFirstMountState()
  const navStructure = useSelector(state => state.nav.navStructure)
  const mediaEnabled = useSelector(state => state.nav.mediaEnabled)

  useLayoutEffect(() => {
    // initial calculation of media query values
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
  }, [])

  useLayoutEffect(() => {
    // if menu item is hidden disable all media queries and get whole nav
    if (isFirstMount) return
    dispatch(disableMedia())
  }, [navStructure])

  useLayoutEffect(() => {
    // if media queries came disabled (after nav change), recalculate media query values
    if (isFirstMount) return
    if (mediaEnabled) return
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
    dispatch(enableMedia())
  }, [mediaEnabled])
}
