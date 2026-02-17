import { css } from '@emotion/react'
import type { NavItem } from '@entity/nav/type'
import { useSelector } from '@shared/lib/redux'
import { TiArrowSortedDown } from 'react-icons/ti'

type Props = {
  navItem: NavItem | undefined
}

export const ArrowForNestedMenu = (props: Props): React.ReactNode => {
  const isNestedMenu = Boolean(props.navItem?.nestedItemList)
  const disabled = Boolean(props.navItem?.disabled)

  const isHamburger = useSelector((state) => state.nav.navMode === 'hamburger')

  if (isHamburger === true) {
    return null
  }

  if (isNestedMenu === false) {
    return null
  }

  if (disabled === true) {
    return null
  }

  return (
    <TiArrowSortedDown
      css={css`
        display: block;
        position: absolute;
        top: calc(50% + 2px);
        transform: translateY(-50%);
        right: 10px;
        color: grey;
        height: 14px;
      `}
    />
  )
}
