import { TiArrowSortedDown } from 'react-icons/ti'
import { css } from '@emotion/react'
import type { MenuItemType } from '@shared/nav/type'

type Props = {
  navItem: MenuItemType | undefined
}

export const ArrowForNestedMenu = (props: Props): React.ReactNode => {
  const isNestedMenu = Boolean(props.navItem?.menuItems)
  const disabled = Boolean(props.navItem?.disabled)

  if (!isNestedMenu) {
    return null
  }

  if (disabled) {
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
