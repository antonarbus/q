import { RotatingLoaderIcon } from '../../../../components/RotatingLoaderIcon'
import { Icon } from './Icon'

export const SpinnerIcon = (): JSX.Element => {
  return (
    <Icon
      icon={<RotatingLoaderIcon/> }
    />
  )
}
