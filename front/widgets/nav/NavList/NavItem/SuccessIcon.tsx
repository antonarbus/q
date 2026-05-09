import { GrStatusGood } from 'react-icons/gr'
import { Icon } from './Icon'

export const SuccessIcon = (): React.JSX.Element => {
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
