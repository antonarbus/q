import { css } from '@emotion/react'
import type { NavItem } from '@shared/nav/type'
import type { ReactNode } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import { navMediaQuery } from '../../navMediaQuery'

type Props = {
  navItem: NavItem | undefined
}

export const ArrowForNestedMenu = (props: Props): ReactNode => {
  const isNestedMenu = Boolean(props.navItem?.navItems)
  const disabled = Boolean(props.navItem?.disabled)

  const isMobile = window.innerWidth < navMediaQuery.widthWhenNothingFits

  if (isMobile === true) {
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
