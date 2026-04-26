import { Logo } from '@front/entities/nav/ui/Logo'
import { NavList } from '@front/entities/nav/ui/NavList'
import { useLoadNavStructure } from '@front/widgets/nav/load-nav-structure'
import { usePressNavShortcut } from '@front/widgets/nav/press-shortcut'
import { NavLayout } from './NavLayout'
import { navStructure } from './navStructure'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'
import { NavRuntime } from './NavRuntime'

export const Nav = (): React.ReactNode => {
  const isEditorView = useIsEditorView()
  useLoadNavStructure({ navStructure })
  usePressNavShortcut({ navStructure })

  if (isEditorView === false) {
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
