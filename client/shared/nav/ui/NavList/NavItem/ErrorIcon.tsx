import { BiErrorCircle } from 'react-icons/bi'
import { Icon } from './Icon'

export const ErrorIcon = (): JSX.Element => {
  return (
    <Icon
      icon={
        <BiErrorCircle
          style={{
            color: '#cb4b4b !important',
          }}
        />
      }
    />
  )
}
