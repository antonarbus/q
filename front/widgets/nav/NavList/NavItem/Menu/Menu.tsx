import { MenuNavigationProvider } from '@front/widgets/nav/provider/MenuNavigationProvider'
import type { Props } from './MenuContent'
import { MenuContent } from './MenuContent'

export const Menu = (props?: Props): React.ReactNode => {
  return (
    <MenuNavigationProvider>
      <MenuContent navItemRef={props?.navItemRef} />
    </MenuNavigationProvider>
  )
}
