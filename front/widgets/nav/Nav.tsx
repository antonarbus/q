import { useRef } from 'react'
import { Logo, NavList } from '@shared/nav'
import { navStructure } from './navStructure'
import { usePressNavShortcut } from '@features/nav/press_shortcut'
import { NavLayout } from './NavLayout'
import { useLoadNavStructure } from '@features/nav/load_nav_structure'
import { useCalculateMediaQueries } from '@features/nav/calculate_media_queries'

export const Nav = (): React.JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useLoadNavStructure({ navStructure })
  usePressNavShortcut({ navStructure })
  useCalculateMediaQueries({ navRef, logoRef })

  return (
    <NavLayout navRef={navRef}>
      <Logo logoRef={logoRef} />
      <NavList />
    </NavLayout>
  )
}
