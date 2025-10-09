import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

export const TopMenuItemsContainer = (): JSX.Element => {
  const isNestedMenu = useSelector(
    (state) => state.nav.idsToCurrentMenuItems.length > 2,
  )

  return (
    <div className='non-slidable'>
      {isNestedMenu === true ? <BackMenuItem /> : <CloseMenuItem />}
    </div>
  )
}
