import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Search } from '@front/widgets/quotation/search'
import { LogoLink } from '@front/widgets/logo/LogoLink'
import type { FC } from 'react'

export const SearchOrLogoOrNothing: FC = () => {
  const permissionLevel = reduxHolder.useSelector((state) => state.quotation.permissionLevel)

  if (permissionLevel === 'PUBLIC' || permissionLevel === 'SHARED') {
    return <LogoLink />
  }

  if (permissionLevel === 'FORBIDDEN' || permissionLevel === 'UNKNOWN') {
    return null
  }

  return <Search />
}
