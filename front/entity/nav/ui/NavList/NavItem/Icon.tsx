import { Tooltip } from '@mui/material'
import type { JSX, ReactNode } from 'react'
import { RoundSpanForIcon } from './RoundSpanForIcon'

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

export const Icon = (props: Props): JSX.Element => {
  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title={props.tooltipText}
    >
      <span className='element-that-keep-ref-from-mui'>
        <RoundSpanForIcon
          className='icon-round-wrapper'
          disabled={props.disabled}
        >
          {typeof props.icon === 'string' ? (
            <span style={{ fontWeight: 600 }}>{props.icon}</span>
          ) : (
            props.icon
          )}
        </RoundSpanForIcon>
      </span>
    </Tooltip>
  )
}
