import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { Icon } from './Icon'

export const SpinnerIcon = (): React.JSX.Element => {
  return <Icon icon={<RotatingLoaderIcon />} />
}
