import type { JSX } from 'react'
import { RotatingLoaderIcon } from '../../../../component/RotatingLoaderIcon'
import { Icon } from './Icon'

export const SpinnerIcon = (): JSX.Element => {
  return <Icon icon={<RotatingLoaderIcon />} />
}
