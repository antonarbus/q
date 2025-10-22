import { Logo } from '@entities/nav/ui/Logo'
import { NavList } from '@entities/nav/ui/NavList'
import { useLoadNavStructure } from '@widgets/nav/load-nav-structure'
import { usePressNavShortcut } from '@widgets/nav/press-shortcut'
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
