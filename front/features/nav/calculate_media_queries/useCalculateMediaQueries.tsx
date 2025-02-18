import { dispatch, useSelector } from '@shared/lib/redux'
import { useLayoutEffect } from 'react'
import { useFirstMountState } from 'react-use'
import { calcNavMediaQueryParams } from './calcNavMediaQueryParams'
import { navSlice } from '@shared/nav'

type Props = {
  navRef: React.RefObject<React.ComponentRef<'div'> | null>
  logoRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const useCalculateMediaQueries = ({ navRef, logoRef }: Props): void => {
  const isFirstMount = useFirstMountState()
  const navStructure = useSelector((state) => state.nav.navStructure)
  const mediaEnabled = useSelector((state) => state.nav.mediaEnabled)

  useLayoutEffect(() => {
    // initial calculation of media query values
    if (!navRef.current) {
      return
    }

    if (!logoRef.current) {
      return
    }

    const { icon, name, burger } = calcNavMediaQueryParams(
      navRef.current,
      logoRef.current,
    )

    dispatch(navSlice.actions.setNavMediaQueryWidths({ icon, name, burger }))
  }, [])

  useLayoutEffect(() => {
    // if menu item is hidden disable all media queries and get whole nav
    if (isFirstMount) {
      return
    }

    dispatch(navSlice.actions.disableMedia())
  }, [navStructure])

  useLayoutEffect(() => {
    // if media queries came disabled (after nav change), recalculate media query values
    if (isFirstMount) {
      return
    }

    if (mediaEnabled) {
      return
    }

    if (!navRef.current) {
      return
    }

    if (!logoRef.current) {
      return
    }

    const { icon, name, burger } = calcNavMediaQueryParams(
      navRef.current,
      logoRef.current,
    )

    dispatch(navSlice.actions.setNavMediaQueryWidths({ icon, name, burger }))
    dispatch(navSlice.actions.enableMedia())
  }, [mediaEnabled])
}
