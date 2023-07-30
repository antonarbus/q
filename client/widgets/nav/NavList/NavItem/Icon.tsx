import { RoundSpanForIcon } from './RoundSpanForIcon'

type Props = {
  icon: string | React.ReactNode
  disabled?: boolean
}

/**
 * Component returns grey circle with an icon inside
 * @descriptions
 * - we may pass icon prop as a component or a string
 * - if sting is passed it becomes bold
 */
export function Icon({ icon, disabled }: Props) {
  return (
    <RoundSpanForIcon className='icon-round-wrapper' disabled={disabled}>
      {typeof icon === 'string' ? (
        <span style={{ fontWeight: 600 }}>{icon}</span>
      ) : (
        icon
      )}
    </RoundSpanForIcon>
  )
}
