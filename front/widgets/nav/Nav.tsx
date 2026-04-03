import { Logo } from '@front/entities/nav/ui/Logo'
import { NavList } from '@front/entities/nav/ui/NavList'
import { useLoadNavStructure } from '@front/widgets/nav/load-nav-structure'
import { usePressNavShortcut } from '@front/widgets/nav/press-shortcut'
import { NavLayout } from './NavLayout'
import { navStructure } from './navStructure'
import { useIsStranger } from '@front/entities/quotation/useIsStranger'

export const Nav = (): React.ReactNode => {
  useLoadNavStructure({ navStructure })
  usePressNavShortcut({ navStructure })
  
  const isStranger = useIsStranger()

  if (isStranger) {
    return null
  }

  return (
    <NavLayout>
      <Logo />
      <NavList />
    </NavLayout>
  )
}
