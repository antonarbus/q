import { useLayoutEffect } from 'react'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { disableMedia, enableMedia, setNavMediaQueryWidths } from '../navSlice'
import { calcNavMediaQueryParams } from './calcNavMediaQueryParams'
import { useFirstMountState } from 'react-use'
import { RefDivType } from 'client/types'

type Props = {
  navRef: RefDivType
  logoRef: RefDivType
}

export function useMediaQueryValues({ navRef, logoRef }: Props) {
  const dispatch = useDispatchTyped()
  const isFirstMount = useFirstMountState()
  const navStructure = useSelectorTyped(state => state.nav.navStructure)
  const mediaEnabled = useSelectorTyped(state => state.nav.mediaEnabled)

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
