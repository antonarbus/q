import type { NavItem } from '@front/entities/nav/type'
import { useSelector } from '@front/shared/lib/redux'
import { iconRegistry } from '@front/widgets/nav/iconRegistry'
import { ErrorIcon } from './ErrorIcon'
import { Icon } from './Icon'
import { SpinnerIcon } from './SpinnerIcon'
import { SuccessIcon } from './SuccessIcon'

type Props = {
  navItem?: NavItem
}

export const IconWithLoader = (props: Props): React.ReactNode => {
  const isHamburger = useSelector((state) => state.nav.navMode === 'hamburger')

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

  if (isHamburger === true) {
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
