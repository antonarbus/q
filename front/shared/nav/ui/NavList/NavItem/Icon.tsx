import { RoundSpanForIcon } from './RoundSpanForIcon'
import { Tooltip } from '@mui/material'
import type { JSX, ReactNode } from 'react'

type Props = {
  icon: ReactNode | string
  disabled?: boolean
  tooltipText?: string
}

/**
 * Component returns grey circle with an icon inside
 * @descriptions
 * - we may pass icon prop as a component or a string
 * - if sting is passed it becomes bold
 */

export const Icon = ({ icon, disabled, tooltipText }: Props): JSX.Element => {
  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title={tooltipText}
    >
      <span className='element-that-keep-ref-from-mui'>
        <RoundSpanForIcon
          className='icon-round-wrapper'
          disabled={disabled}
        >
          {typeof icon === 'string' ? (
            <span style={{ fontWeight: 600 }}>{icon}</span>
          ) : (
            icon
          )}
        </RoundSpanForIcon>
      </span>
    </Tooltip>
  )
}
