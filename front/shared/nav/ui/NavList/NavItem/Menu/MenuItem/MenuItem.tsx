import { dispatch, useSelector } from '@shared/lib/redux'
import type { MouseEvent, JSX } from 'react'
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

export const MenuItem = (props: Props): JSX.Element => {
  const location = useLocation()

  const isHovered = useSelector(
    (state) => state.nav.hoverIndex === props.hoverIndex,
  )

  const isNextMenuAvailable = Boolean(props.navItem.navItems)
  const link = props.navItem.link ?? ''

  const fixedLink = `${location.pathname}/${link}`
    .replace('.', '')
    .replace('//', '/')
    .replace('//', '/')

  const to = link.includes('.') ? fixedLink : link

  const menuItemContent = (
    <>
      {Boolean(props.navItem.icon) && props.navItem.isLoading === true ? (
        <SpinnerIcon />
      ) : null}
      {Boolean(props.navItem.icon) && props.navItem.isSuccess === true ? (
        <SuccessIcon />
      ) : null}
      {Boolean(props.navItem.icon) && props.navItem.isError === true ? (
        <ErrorIcon />
      ) : null}
      {Boolean(props.navItem.icon) &&
      props.navItem.isLoading !== true &&
      props.navItem.isSuccess !== true &&
      props.navItem.isError !== true ? (
        <Icon
          disabled={props.navItem.disabled === true}
          icon={props.navItem.icon}
        />
      ) : null}
      <TextInMenu
        disabled={props.navItem.disabled === true}
        name={props.navItem.name}
        reserveSpaceForIcon={isNextMenuAvailable}
      />
      {isNextMenuAvailable && props.navItem.disabled === false ? (
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
      {props.navItem.shortcut !== undefined && (
        <Shortcut
          $isHovered={isHovered}
          shortcut={props.navItem.shortcut}
        />
      )}
    </>
  )

  // If externalLink is provided, render regular <a> tag for external navigation
  if (props.navItem.externalLink !== undefined) {
    return (
      <a
        css={{
          position: 'relative',
          height: '45px',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          borderRadius: '8px',
          padding: '0.5rem',
          margin: '0px 16px',
          color: '#dadce1',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
          backgroundColor: isHovered === true ? '#5253575a' : 'initial',
          filter: isHovered === true ? 'brightness(1.2)' : 'none',
        }}
        href={props.navItem.externalLink}
        onClick={(event: MouseEvent): void => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
          }

          const disableClick =
            props.navItem.isLoading ??
            props.navItem.isSuccess ??
            props.navItem.isError ??
            props.navItem.disabled === true

          if (disableClick === true) {
            event.preventDefault()

            return
          }

          // Close menu after clicking external link
          dispatch(navSlice.actions.closeMenu())
        }}
        onMouseEnter={(): void => {
          dispatch(
            navSlice.actions.setMenuItemHoverIndex({
              menuItemHoverIndex: props.hoverIndex,
            }),
          )
        }}
        rel='noopener noreferrer'
        target='_blank'
      >
        {menuItemContent}
      </a>
    )
  }

  // Default: use React Router Link for SPA navigation
  return (
    <MenuItemLayout
      isHovered={isHovered}
      onClick={(event: MouseEvent): void => {
        if (Boolean(props.navItem.func) === true) {
          event.preventDefault()
        }

        if (props.navItem.isLoading === true) {
          return
        }

        if (props.navItem.isSuccess === true) {
          return
        }

        if (props.navItem.isError === true) {
          return
        }

        if (props.navItem.disabled === true) {
          event.preventDefault()

          return
        }

        clickOnMenuItem(
          event,
          props.navItem.id,
          Boolean(props.navItem.disabled),
        )
      }}
      onMouseEnter={(): void => {
        dispatch(
          navSlice.actions.setMenuItemHoverIndex({
            menuItemHoverIndex: props.hoverIndex,
          }),
        )
      }}
      to={to}
    >
      {menuItemContent}
    </MenuItemLayout>
  )
}
