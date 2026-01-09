import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import type { JSX } from 'react'
import { Icon } from './Icon'

export const SpinnerIcon = (): JSX.Element => {
  return <Icon icon={<RotatingLoaderIcon />} />
}
