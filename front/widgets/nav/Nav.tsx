import { Logo } from '@front/entities/nav/ui/Logo'
import { NavList } from '@front/entities/nav/ui/NavList'
import { useLoadNavStructure } from '@front/widgets/nav/load-nav-structure'
import { usePressNavShortcut } from '@front/widgets/nav/press-shortcut'
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
