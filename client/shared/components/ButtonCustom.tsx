import { Button, type ButtonProps } from '@mui/material'
import { FaCircleCheck } from 'react-icons/fa6'
import { PiSmileySadBold } from 'react-icons/pi'
import { RotatingLoaderIcon } from './RotatingLoaderIcon'

type Props = ButtonProps & {
  isLoading?: boolean
  isPending?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export const ButtonCustom = ({
  isLoading,
  isPending,
  isSuccess,
  isError,
  ...restProps
}: Props): JSX.Element => {
  return (
    <Button
      variant='contained'
      type='submit'
      fullWidth
      {...restProps}
      sx={{
        alignSelf: 'center',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...restProps.sx,
      }}
    >
      {restProps.children}
      {(isLoading === true || isPending === true) && (
        <RotatingLoaderIcon style={{ height: '25px', width: '25px', position: 'absolute', color: 'black' }}/>
      )}
      {isSuccess && (
        <FaCircleCheck css={{ height: '25px', width: '25px', position: 'absolute', color: 'black' }}/>
      )}
      {isError && (
        <PiSmileySadBold css={{ height: '25px', width: '25px', position: 'absolute', color: 'black' }} />
      )}
    </Button>
  )
}
