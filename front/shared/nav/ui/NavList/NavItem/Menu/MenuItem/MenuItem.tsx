import { dispatch, useSelector } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { navSlice } from '../../../../../navSlice'
import type { NavItem } from '../../../../../type'
import { ErrorIcon } from '../../ErrorIcon'
import { Icon } from '../../Icon'
import { RoundSpanForIcon } from '../../RoundSpanForIcon'
import { SpinnerIcon } from '../../SpinnerIcon'
import { SuccessIcon } from '../../SuccessIcon'
import { clickOnMenuItem } from './function/clickOnMenuItem'
import { MenuItemLayout } from './MenuItemStyled'
import { Shortcut } from './Shortcut'
import { TextInMenu } from './TextInMenu'

type Props = {
  menuItem: NavItem
  menuItemHoverIndex: number
}

export const MenuItem = ({
  menuItem,
  menuItemHoverIndex,
}: Props): React.JSX.Element => {
  const location = useLocation()

  const isHovered = useSelector(
    (state) => state.nav.menuItemHoverIndex === menuItemHoverIndex,
  )

  const isNextMenuAvailable = Boolean(menuItem.navItems)
  const isIcon = Boolean(menuItem.icon)
  const menuId = menuItem.id
  const link = menuItem.link ?? ''
  const isFunc = Boolean(menuItem.func)
  const shortcut = menuItem.shortcut
  const disabled = Boolean(menuItem.disabled)
  const isLoading = menuItem.isLoading
  const isSuccess = menuItem.isSuccess
  const isError = menuItem.isError

  const fixedLink = `${location.pathname}/${link}`
    .replace('.', '')
    .replace('//', '/')
    .replace('//', '/')

  const to = link.includes('.') ? fixedLink : link

  return (
    <MenuItemLayout
      to={to}
      isHovered={isHovered}
      onClick={(e: MouseEvent): void => {
        if (isFunc) {
          e.preventDefault()
        }

        if (isLoading) {
          return
        }

        if (isSuccess) {
          return
        }

        if (isError) {
          return
        }

        if (disabled) {
          e.preventDefault()

          return
        }

        clickOnMenuItem(e, menuId, disabled)
      }}
      onMouseEnter={(): void => {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({
            menuItemHoverIndex,
          }),
        )
      }}
    >
      {isIcon && isLoading && <SpinnerIcon />}
      {isIcon && isSuccess && <SuccessIcon />}
      {isIcon && isError && <ErrorIcon />}
      {isIcon && !isLoading && !isSuccess && !isError && (
        <Icon
          icon={menuItem.icon}
          disabled={disabled}
        />
      )}
      <TextInMenu
        reserveSpaceForIcon={isNextMenuAvailable}
        name={menuItem.name}
        disabled={disabled}
      />
      {isNextMenuAvailable && !disabled && (
        <RoundSpanForIcon
          css={{
            background: 'transparent',
            marginRight: '-5px',
            position: 'absolute',
            right: '10px',
          }}
        >
          <FaChevronRight />
        </RoundSpanForIcon>
      )}
      {shortcut && (
        <Shortcut
          shortcut={shortcut}
          $isHovered={isHovered}
        />
      )}
    </MenuItemLayout>
  )
}
