import { RoundSpanForIcon } from './RoundSpanForIcon'
import { Tooltip } from '@mui/material'

type Props = {
  icon: React.ReactNode | string
  disabled?: boolean
  tooltipText?: string
}

/**
 * Component returns grey circle with an icon inside
 * @descriptions
 * - we may pass icon prop as a component or a string
 * - if sting is passed it becomes bold
 */

export const Icon = ({
  icon,
  disabled,
  tooltipText,
}: Props): React.JSX.Element => {
  return (
    <Tooltip
      title={tooltipText}
      placement='bottom'
      enterDelay={500}
      enterNextDelay={500}
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
