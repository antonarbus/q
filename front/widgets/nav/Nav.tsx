import { Logo, NavList } from '@shared/nav'
import { navStructure } from './navStructure'
import { usePressNavShortcut } from '@features/nav/press_shortcut'
import { NavLayout } from './NavLayout'
import { useLoadNavStructure } from '@features/nav/load_nav_structure'

export const Nav = (): React.JSX.Element => {
  useLoadNavStructure({ navStructure })
  usePressNavShortcut({ navStructure })

  return (
    <NavLayout>
      <Logo />
      <NavList />
    </NavLayout>
  )
}
