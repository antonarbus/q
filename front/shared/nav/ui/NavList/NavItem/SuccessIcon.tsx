import { GrStatusGood } from 'react-icons/gr'
import { Icon } from './Icon'
import type { JSX } from 'react'

export const SuccessIcon = (): JSX.Element => {
  return (
    <Icon
      icon={
        <GrStatusGood
          style={{
            stroke: '#52cb4b',
          }}
        />
      }
    />
  )
}
