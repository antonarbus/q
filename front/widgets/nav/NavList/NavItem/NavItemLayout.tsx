import { css } from '@emotion/react'
import { theme } from '@front/shared/theme'

type Props = {
  children: React.ReactNode
  navItemRef: React.RefObject<React.ComponentRef<'li'> | null>
  disabled: boolean
  isActive?: boolean
  visibility?: 'hidden' | 'visible'
}

export const NavItemLayout = (props: Props): React.JSX.Element => {
  return (
    <li
      className='nav-item'
      style={{ visibility: props.visibility }}
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
            color: ${props.disabled ? '#585858' : theme.color.greyFont};
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
