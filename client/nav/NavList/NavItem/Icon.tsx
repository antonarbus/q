import { RoundSpanForIconStyled } from './RoundSpanForIconStyled'

type Props = {
  icon: string | React.ReactNode
}

/**
 * Component returns grey circle with an icon inside
 * @descriptions
 * - we may pass icon prop as a component or a string
 * - if sting is passed it becomes bold
 */
export function Icon({ icon }: Props) {
  return (
    <RoundSpanForIconStyled className='icon-round-wrapper'>
      {typeof icon === 'string' ? <span style={{ fontWeight: 600 }}>{icon}</span> : icon}
    </RoundSpanForIconStyled>
  )
}
