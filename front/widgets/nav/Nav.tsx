import { Logo, NavList } from '@shared/nav'
import { navStructure } from './navStructure'
import { usePressNavShortcut } from '@features/nav/press-shortcut'
import { NavLayout } from './NavLayout'
import { useLoadNavStructure } from '@features/nav/load-nav-structure'
import type { JSX } from 'react'

export const Nav = (): JSX.Element => {
  useLoadNavStructure({ navStructure })
  usePressNavShortcut({ navStructure })

  return (
    <NavLayout>
      <Logo />
      <NavList />
    </NavLayout>
  )
}
