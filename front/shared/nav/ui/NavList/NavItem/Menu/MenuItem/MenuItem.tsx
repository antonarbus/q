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
  navItem: NavItem
  hoverIndex: number
}

export const MenuItem = ({ navItem, hoverIndex }: Props): React.JSX.Element => {
  const location = useLocation()

  const isHovered = useSelector((state) => state.nav.hoverIndex === hoverIndex)

  const isNextMenuAvailable = Boolean(navItem.navItems)
  const isIcon = Boolean(navItem.icon)
  const menuId = navItem.id
  const link = navItem.link ?? ''
  const isFunc = Boolean(navItem.func)
  const shortcut = navItem.shortcut
  const disabled = Boolean(navItem.disabled)
  const isLoading = navItem.isLoading
  const isSuccess = navItem.isSuccess
  const isError = navItem.isError

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
            menuItemHoverIndex: hoverIndex,
          }),
        )
      }}
    >
      {isIcon && isLoading && <SpinnerIcon />}
      {isIcon && isSuccess && <SuccessIcon />}
      {isIcon && isError && <ErrorIcon />}
      {isIcon && !isLoading && !isSuccess && !isError && (
        <Icon
          icon={navItem.icon}
          disabled={disabled}
        />
      )}
      <TextInMenu
        reserveSpaceForIcon={isNextMenuAvailable}
        name={navItem.name}
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
