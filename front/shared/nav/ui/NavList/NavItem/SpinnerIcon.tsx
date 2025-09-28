import { RotatingLoaderIcon } from '../../../../component/RotatingLoaderIcon'
import { Icon } from './Icon'
import type { JSX } from 'react'

export const SpinnerIcon = (): JSX.Element => {
  return <Icon icon={<RotatingLoaderIcon />} />
}
