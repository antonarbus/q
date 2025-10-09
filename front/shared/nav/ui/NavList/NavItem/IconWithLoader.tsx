import type { NavItem } from '@shared/nav/type'
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
  const { icon, isLoading, isSuccess, isError } = props.navItem
  const disabled = Boolean(props.navItem.disabled)
  const tooltipText = props.navItem.tooltip

  if (isMobile === true) {
    return icon
  }

  if (Boolean(icon) === false) {
    return <Icon disabled={disabled} icon={firstLetter} />
  }

  if (isLoading === true) {
    return <SpinnerIcon />
  }

  if (isSuccess === true) {
    return <SuccessIcon />
  }

  if (isError === true) {
    return <ErrorIcon />
  }

  return <Icon disabled={disabled} icon={icon} tooltipText={tooltipText} />
}
