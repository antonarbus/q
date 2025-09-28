import { css } from '@emotion/react'
import { theme } from '@shared/theme'
import type { JSX,ReactNode,ComponentRef,RefObject } from 'react'

type Props = {
  children: ReactNode
  navItemRef: RefObject<ComponentRef<'li'> | null>
  disabled: boolean
  isActive?: boolean
}

export const NavItemLayout = (props: Props): JSX.Element => {
  return (
    <li
      className='nav-item'
      css={css`
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        padding: 0px 1px;
        user-select: none;

        & > a {
          display: flex;
          align-items: center;
          position: relative;
          text-decoration: none;
          -webkit-user-drag: none;
          cursor: ${props.disabled ? 'default' : 'pointer'};

          &:hover,
          &:focus,
          &:active {
            filter: brightness(${props.disabled ? 1 : 1.2});
          }

          .nav-item-text {
            color: ${props.disabled ? '#585858' : theme.colors.greyFont};
            white-space: nowrap;
            text-decoration: ${props.isActive === true ? 'underline' : 'none'};
          }
        }

        @media screen and (width <= 480px) {
          position: static;
        }
      `}
      ref={props.navItemRef}
    >
      {props.children}
    </li>
  )
}
