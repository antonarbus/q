import { dispatch } from '@lib_instances/store'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { navSlice, useMediaQueryValues, Logo, NavList } from '@shared/nav'
import { navStructure } from './navStructure'
import { usePressNavShortcut } from '@features/nav/press_shortcut'
import { NavLayout } from './NavLayout'

export const Nav = (): React.JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  usePressNavShortcut({ navStructure })
  useMediaQueryValues({ navRef, logoRef })
  useEffectOnce(() => {
    dispatch(navSlice.actions.addNavStructure({ navStructure }))
  })

  return (
    <NavLayout navRef={navRef}>
      <Logo logoRef={logoRef} />
      <NavList />
    </NavLayout>
  )
}
