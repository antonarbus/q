import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

export const TopMenuItemsContainer = (): React.JSX.Element => {
  const isNestedMenu = reduxHolder.useSelector(
    (state) => state.nav.idsToCurrentMenuItems.length > 2,
  )

  return (
    <div className='non-slidable'>
      {isNestedMenu === true ? <BackMenuItem /> : <CloseMenuItem />}
    </div>
  )
}
