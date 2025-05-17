import type { NavItem } from '@shared/nav/type'
import { SpinnerIcon } from './SpinnerIcon'
import { SuccessIcon } from './SuccessIcon'
import { ErrorIcon } from './ErrorIcon'
import { Icon } from './Icon'
import { navMediaQuery } from '../../navMediaQuery'

type Props = {
  navItem?: NavItem
}

export const IconWithLoader = (props: Props): React.ReactNode => {
  const isMobile = window.innerWidth < navMediaQuery.widthWhenNothingFits

  if (props.navItem === undefined) {
    return null
  }

  const firstLetter = props.navItem.name.at(0)
  const { icon, isLoading, isSuccess, isError } = props.navItem
  const disabled = Boolean(props.navItem.disabled)
  const tooltipText = props.navItem.tooltip

  if (isMobile) {
    return icon
  }

  if (Boolean(icon) === false) {
    return (
      <Icon
        icon={firstLetter}
        disabled={disabled}
      />
    )
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

  return (
    <Icon
      icon={icon}
      disabled={disabled}
      tooltipText={tooltipText}
    />
  )
}
