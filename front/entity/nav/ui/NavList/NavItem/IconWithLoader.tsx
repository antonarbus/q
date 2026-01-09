import type { NavItem } from '@entity/nav/type'
import { iconRegistry } from '@widget/nav/iconRegistry'
import type { ReactNode } from 'react'
import { navMediaQuery } from '../../navMediaQuery'
import { ErrorIcon } from './ErrorIcon'
import { Icon } from './Icon'
import { SpinnerIcon } from './SpinnerIcon'
import { SuccessIcon } from './SuccessIcon'

type Props = {
  navItem?: NavItem
}

export const IconWithLoader = (props: Props): ReactNode => {
  const isMobile = window.innerWidth < navMediaQuery.widthWhenNothingFits

  if (props.navItem === undefined) {
    return null
  }

  const firstLetter = props.navItem.name.at(0)
  const disabled = Boolean(props.navItem.disabled)
  const tooltipText = props.navItem.tooltip

  const icon =
    props.navItem.iconId === undefined
      ? undefined
      : iconRegistry[props.navItem.iconId]

  if (isMobile === true) {
    return icon
  }

  if (Boolean(icon) === false) {
    return <Icon disabled={disabled} icon={firstLetter} />
  }

  if (props.navItem.isLoading === true) {
    return <SpinnerIcon />
  }

  if (props.navItem.isSuccess === true) {
    return <SuccessIcon />
  }

  if (props.navItem.isError === true) {
    return <ErrorIcon />
  }

  return <Icon disabled={disabled} icon={icon} tooltipText={tooltipText} />
}
