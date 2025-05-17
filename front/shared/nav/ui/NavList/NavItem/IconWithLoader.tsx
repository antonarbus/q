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
  const icon = props.navItem.icon
  const isLoading = props.navItem.isLoading
  const isSuccess = props.navItem.isSuccess
  const isError = props.navItem.isError
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

  if (isLoading) {
    return <SpinnerIcon />
  }

  if (isSuccess) {
    return <SuccessIcon />
  }

  if (isError) {
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
