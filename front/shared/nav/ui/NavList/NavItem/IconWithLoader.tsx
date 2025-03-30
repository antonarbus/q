import type { NavItem } from '@shared/nav/type'
import { SpinnerIcon } from './SpinnerIcon'
import { SuccessIcon } from './SuccessIcon'
import { ErrorIcon } from './ErrorIcon'
import { Icon } from './Icon'

type Props = {
  navItem?: NavItem
}

export const IconWithLoader = (props: Props): React.ReactNode => {
  if (!props.navItem) {
    return null
  }

  const firstLetter = props.navItem.name.at(0)
  const icon = props.navItem.icon
  const isLoading = props.navItem.isLoading
  const isSuccess = props.navItem.isSuccess
  const isError = props.navItem.isError
  const disabled = Boolean(props.navItem.disabled)
  const tooltipText = props.navItem.tooltip

  if (icon && isLoading) {
    return <SpinnerIcon />
  }

  if (icon && isSuccess) {
    return <SuccessIcon />
  }

  if (icon && isError) {
    return <ErrorIcon />
  }

  if (icon && !isLoading && !isSuccess && !isError) {
    return (
      <Icon
        icon={icon}
        disabled={disabled}
        tooltipText={tooltipText}
      />
    )
  }

  if (!icon) {
    return (
      <Icon
        icon={firstLetter}
        disabled={disabled}
      />
    )
  }

  return null
}
