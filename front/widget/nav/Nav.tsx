import { Logo } from '@entity/nav/ui/Logo'
import { NavList } from '@entity/nav/ui/NavList'
import { useLoadNavStructure } from '@widget/nav/load-nav-structure'
import { usePressNavShortcut } from '@widget/nav/press-shortcut'
import { NavLayout } from './NavLayout'
import { navStructure } from './navStructure'

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
