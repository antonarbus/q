import { Button, type ButtonProps } from '@mui/material'
import { useSignal } from '@preact/signals-react'
import { useEffect } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { PiSmileySadBold } from 'react-icons/pi'
import { RotatingLoaderIcon } from './RotatingLoaderIcon'

type Props = ButtonProps & {
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  isButtonPending?: boolean
  isButtonSuccess?: boolean
  isButtonError?: boolean
}

export const ButtonCustom = ({
  isButtonDisabled,
  isButtonLoading,
  isButtonPending,
  isButtonSuccess,
  isButtonError,
  ...restProps
}: Props): JSX.Element => {
  const showSuccessIcon = useSignal(false)
  const showErrorIcon = useSignal(false)

  useEffect(() => {
    if (isButtonError) {
      showErrorIcon.value = true
      setTimeout(() => {
        showErrorIcon.value = false
      }, 2500)
    }

    if (isButtonSuccess) {
      showSuccessIcon.value = true
      setTimeout(() => {
        showSuccessIcon.value = false
      }, 2500)
    }
  }, [isButtonError, isButtonSuccess])

  return (
    <Button
      className='button'
      variant='contained'
      type='submit'
      disabled={isButtonDisabled}
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
      {(isButtonLoading === true) && (
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
