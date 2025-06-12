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
  const disabled = Boolean(navItem.disabled)
  const { shortcut, isLoading, isSuccess, isError } = navItem

  const fixedLink = `${location.pathname}/${link}`
    .replace('.', '')
    .replace('//', '/')
    .replace('//', '/')

  const to = link.includes('.') ? fixedLink : link

  return (
    <MenuItemLayout
      isHovered={isHovered}
      onClick={(event: MouseEvent): void => {
        if (isFunc === true) {
          event.preventDefault()
        }

        if (isLoading === true) {
          return
        }

        if (isSuccess === true) {
          return
        }

        if (isError === true) {
          return
        }

        if (disabled === true) {
          event.preventDefault()

          return
        }

        clickOnMenuItem(event, menuId, disabled)
      }}
      onMouseEnter={(): void => {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({
            menuItemHoverIndex: hoverIndex,
          }),
        )
      }}
      to={to}
    >
      {isIcon && isLoading === true ? <SpinnerIcon /> : null}
      {isIcon && isSuccess === true ? <SuccessIcon /> : null}
      {isIcon && isError === true ? <ErrorIcon /> : null}
      {isIcon &&
      isLoading !== true &&
      isSuccess !== true &&
      isError !== true ? (
        <Icon
          disabled={disabled}
          icon={navItem.icon}
        />
      ) : null}
      <TextInMenu
        disabled={disabled}
        name={navItem.name}
        reserveSpaceForIcon={isNextMenuAvailable}
      />
      {isNextMenuAvailable && disabled === false ? (
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
      ) : null}
      {shortcut !== undefined && (
        <Shortcut
          $isHovered={isHovered}
          shortcut={shortcut}
        />
      )}
    </MenuItemLayout>
  )
}
