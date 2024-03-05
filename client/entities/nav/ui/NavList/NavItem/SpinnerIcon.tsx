import { RotatingLoaderIcon } from '@shared/components'
import { Icon } from './Icon'

export const SpinnerIcon = (): JSX.Element => {
  return (
    <Icon
      icon={<RotatingLoaderIcon />}
    />
  )
}
