import { useSelectorTyped } from '@lib_instances/store'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

export const TopMenuItemsContainer = (): React.JSX.Element => {
  const isNestedMenu = useSelectorTyped(
    (state) => state.nav.idsToNextMenuItems.length > 2,
  )

  return (
    <div className='non-slidable'>
      {isNestedMenu ? <BackMenuItem /> : <CloseMenuItem />}
    </div>
  )
}
