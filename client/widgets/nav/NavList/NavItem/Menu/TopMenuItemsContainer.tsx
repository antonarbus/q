import { useSelectorTyped } from 'client/shared/hooks'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

export function TopMenuItemsContainer() {
  const isNestedMenu = useSelectorTyped(
    (state) => state.nav.idsToNextMenuItems.length > 2
  )

  return (
    <div className='non-slidable'>
      {isNestedMenu ? <BackMenuItem /> : <CloseMenuItem />}
    </div>
  )
}
