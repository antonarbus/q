import { useSelectorTyped as useSelector } from '@src/store'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

export function TopMenuItemsContainer() {
  const isNestedMenu = useSelector(state => state.nav.idsToNextMenuItems.length > 2)
  return (
    <div className='non-slidable' >
      {isNestedMenu ? <BackMenuItem /> : <CloseMenuItem />}
    </div>
  )
}
