import { Logo } from '@front/widgets/nav/Logo'
import { NavList } from '@front/widgets/nav/NavList'
import { useLoadNavStructure } from '@front/widgets/nav/load-nav-structure'
import { usePressNavShortcut } from '@front/widgets/nav/press-shortcut'
import { NavLayout } from './NavLayout'
import { navStructure } from './navStructure'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { NavRuntime } from './NavRuntime'

export const Nav = (): React.ReactNode => {
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)
  useLoadNavStructure({ navStructure })
  usePressNavShortcut({ navStructure })

  if (permissionLevel === 'PUBLIC' || permissionLevel === 'SHARED') {
    return null
  }

  return (
    <NavLayout>
      <NavRuntime />
      <Logo />
      <NavList />
    </NavLayout>
  )
}
