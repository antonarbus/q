import type { RefObject } from 'react'
import { useLayoutEffect } from 'react'
import { useSelectorTyped } from '@shared/hooks'
import { navSlice } from '@entities/nav'
import { calcNavMediaQueryParams } from './calcNavMediaQueryParams'
import { useFirstMountState } from 'react-use'
import { dispatch } from '@shared/clients'

type Props = {
  navRef: RefObject<HTMLDivElement>
  logoRef: RefObject<HTMLDivElement>
}

export const useMediaQueryValues = ({ navRef, logoRef }: Props): void => {
  const isFirstMount = useFirstMountState()
  const navStructure = useSelectorTyped(state => state.nav.navStructure)
  const mediaEnabled = useSelectorTyped(state => state.nav.mediaEnabled)

  useLayoutEffect(() => {
    // initial calculation of media query values
    if (!navRef.current) return
    if (!logoRef.current) return
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(navSlice.actions.setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
  }, [])

  useLayoutEffect(() => {
    // if menu item is hidden disable all media queries and get whole nav
    if (isFirstMount) return
    dispatch(navSlice.actions.disableMedia())
  }, [navStructure])

  useLayoutEffect(() => {
    // if media queries came disabled (after nav change), recalculate media query values
    if (isFirstMount) return
    if (mediaEnabled) return
    if (!navRef.current) return
    if (!logoRef.current) return
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(navSlice.actions.setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
    dispatch(navSlice.actions.enableMedia())
  }, [mediaEnabled])
}
