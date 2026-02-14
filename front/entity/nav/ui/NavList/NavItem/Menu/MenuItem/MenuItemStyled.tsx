import { css } from '@emotion/react'
import { theme } from '@shared/theme'

import { Link, type LinkProps } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  to: string
  isHovered: boolean
} & LinkProps

export const MenuItemLayout = (props: Props): React.JSX.Element => {
  const { to, isHovered, children, ...restProps } = props

  return (
    <Link
      css={css`
        position: relative;
        height: ${theme.menu.navItem.height}px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        border-radius: 8px;
        padding: 0.5rem;
        margin: 0px 16px;
        color: #dadce1;
        white-space: nowrap;
        text-decoration: none;
        background-color: ${isHovered === true ? '#5253575a' : 'initial'};
        filter: ${isHovered === true ? 'brightness(1.2)' : 'none'};
      `}
      to={to}
      {...restProps}
    >
      {children}
    </Link>
  )
}
