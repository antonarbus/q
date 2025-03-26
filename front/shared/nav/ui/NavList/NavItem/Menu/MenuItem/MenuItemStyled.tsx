import { theme } from '@shared/theme'
import { type LinkProps, Link } from 'react-router-dom'
import { css } from '@emotion/react'

type Props = {
  children: React.ReactNode
  to: string
  isHovered: boolean
} & LinkProps

export const MenuItemLayout = ({
  to,
  isHovered,
  children,
  ...restProps
}: Props): React.JSX.Element => {
  return (
    <Link
      to={to}
      css={css`
        position: relative;
        height: ${theme.menu.menuItem.height}px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        border-radius: 8px;
        padding: 0.5rem;
        margin: 0px 16px;
        color: #dadce1;
        white-space: nowrap;
        text-decoration: none;
        background-color: ${isHovered ? '#5253575a' : 'initial'};
        filter: ${isHovered ? 'brightness(1.2)' : 'none'};
      `}
      {...restProps}
    >
      {children}
    </Link>
  )
}
