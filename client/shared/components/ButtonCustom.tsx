import { Button, type ButtonProps } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useEffect } from 'react'
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
  const showSuccessIcon = useSignal(false)
  const showErrorIcon = useSignal(false)

  useEffect(() => {
    if (isError) {
      showErrorIcon.value = true
      setTimeout(() => {
        showErrorIcon.value = false
      }, 2500)
    }

    if (isSuccess) {
      showSuccessIcon.value = true
      setTimeout(() => {
        showSuccessIcon.value = false
      }, 2500)
    }
  }, [isError, isSuccess])

  return (
    <Button
      variant='contained'
      type='submit'
      {...restProps}
      sx={{
        alignSelf: 'center',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50px',
        ...restProps.sx,
      }}
    >
      {(!showSuccessIcon.value && !showErrorIcon.value) &&
        restProps.children
      }
      {(isLoading === true || isPending === true) && (
        <RotatingLoaderIcon style={{ height: '25px', width: '25px', position: 'absolute', color: 'white' }} />
      )}
      {showSuccessIcon.value && (
        <FaCircleCheck style={{ height: '25px', width: '25px', position: 'absolute', color: 'white' }} />
      )}
      {showErrorIcon.value && (
        <PiSmileySadBold style={{ height: '25px', width: '25px', position: 'absolute', color: 'white' }} />
      )}
    </Button>
  )
}
