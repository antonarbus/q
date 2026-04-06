import { Button } from '@mui/material'
import { MdOpenInNew } from 'react-icons/md'

type Props = {
  url: string
}

export const OpenPaymentLinkButton = (props: Props): React.JSX.Element => {
  return (
    <Button
      href={props.url}
      size='small'
      startIcon={<MdOpenInNew />}
      target='_blank'
      variant='outlined'
    >
      Open
    </Button>
  )
}
