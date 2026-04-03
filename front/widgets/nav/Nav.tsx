import { Logo } from '@front/entities/nav/ui/Logo'
import { NavList } from '@front/entities/nav/ui/NavList'
import { useLoadNavStructure } from '@front/widgets/nav/load-nav-structure'
import { usePressNavShortcut } from '@front/widgets/nav/press-shortcut'
import { NavLayout } from './NavLayout'
import { navStructure } from './navStructure'
import { useIsFullAppView } from '@front/entities/quotation/util/useIsFullAppView'

export const Nav = (): React.ReactNode => {
  useLoadNavStructure({ navStructure })
  usePressNavShortcut({ navStructure })

  const isFullAppView = useIsFullAppView()

  if (isFullAppView === false) {
    return null
  }

  return (
    <NavLayout>
      <Logo />
      <NavList />
    </NavLayout>
  )
}
