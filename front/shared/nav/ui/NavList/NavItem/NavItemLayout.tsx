import { css } from '@emotion/react'
import { theme } from '@shared/theme'

type Props = {
  children: React.ReactNode
  navItemRef: React.RefObject<React.ComponentRef<'li'> | null>
  disabled: boolean
  isActive?: boolean
}

export const NavItemLayout = ({
  children,
  navItemRef,
  disabled,
  isActive,
}: Props): React.JSX.Element => {
  return (
    <li
      ref={navItemRef}
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
          cursor: ${disabled ? 'default' : 'pointer'};

          &:hover,
          &:focus,
          &:active {
            filter: brightness(${disabled ? 1 : 1.2});
          }

          .nav-item-name {
            /* margin-left: 5px;
            margin-right: 5px; */
          }

          .nav-item-text {
            color: ${disabled ? '#585858' : theme.colors.greyFont};
            white-space: nowrap;
            text-decoration: ${isActive ? 'underline' : 'none'};
          }

          .arrow-for-nested-menu {
            display: none;
            position: absolute;
            top: calc(50% + 2px);
            transform: translateY(-50%);
            right: -12px;
            color: grey;
            height: 14px;
          }

          &:hover > .arrow-for-nested-menu,
          &:focus > .arrow-for-nested-menu {
            display: block;
          }
        }

        @media screen and (width <= 480px) {
          position: static;
        }

        outline: 1px solid red;
      `}
    >
      {children}
    </li>
  )
}
