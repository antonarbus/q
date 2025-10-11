import { useLoadNavStructure } from '@features/nav/load-nav-structure'
import { usePressNavShortcut } from '@features/nav/press-shortcut'
import { Logo } from '@shared/nav/ui/Logo'
import { NavList } from '@shared/nav/ui/NavList'
import type { JSX } from 'react'
import { NavLayout } from './NavLayout'
import { navStructure } from './navStructure'

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
