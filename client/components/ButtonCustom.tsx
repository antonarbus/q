import { Button, CircularProgress } from '@mui/material'
import { useRef } from 'react'
import { useUpdateEffect } from 'react-use'
import './successErrorIcons.css'
import { RefDiv } from 'client/types'

type Props = {
  children?: React.ReactNode
  content?: React.ReactNode,
  circleProgressSize?: number | string
  disabled?: boolean
  loading?: any
  setLoading?: any
  success?: any
  setSuccess?: any
  error?: any
  setError?: any
  httpStatus?: 'loading' | 'error' | 'success' | ''
  setHttpStatus?: any
  [x:string]: any // all other ...restProps props
}

export function ButtonCustom({ children, content, circleProgressSize, disabled, httpStatus, setHttpStatus, ...restProps }: Props) {
  const successIconRef = useRef() as RefDiv
  const errorIconRef = useRef() as RefDiv

  useUpdateEffect(() => {
    const timer = window.setTimeout(() => setHttpStatus(''), 3000)
    return () => clearTimeout(timer)
  }, [httpStatus])

  const iconBackgroundStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: '50%',
  }

  return (
    <Button
      variant='contained'
      disabled={(httpStatus && ['loading', 'error', 'success'].includes(httpStatus)) || disabled}
      type='submit'
      fullWidth
      sx={{
        alignSelf: 'center',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...restProps}
    >
      {children}
      {content}
      {httpStatus === 'loading' && (
          <CircularProgress
            size={circleProgressSize || 30}
            sx={{
              color: 'black',
              position: 'absolute',
            }}
          />
      )}
      {httpStatus === 'success' && (
        <div
          ref={successIconRef}
          css={{
            ...iconBackgroundStyle,
            height: circleProgressSize || 30,
            width: circleProgressSize || 30,
          }}
        >
          {<svg className='checkmark' viewBox='0 0 52 52'><circle className='checkmark__circle' cx='26' cy='26' r='25' fill='none'/><path className='checkmark__check' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8'/></svg>}
        </div>
      )}
      {httpStatus === 'error' && (
        <div
          ref={errorIconRef}
          css={{
            ...iconBackgroundStyle,
            height: circleProgressSize || 30,
            width: circleProgressSize || 30,
          }}
        >
          {<svg viewBox='0 0 52 52' className='checkmark'><circle cx='26' cy='26' r='25' fill='none' className='checkmark__circle checkmark__cross'></circle><path fill='none' d='M 12,12 L 40,40 M 40,12 L 12,40' className='checkmark__check'></path></svg>}
        </div>
      )}
    </Button>
  )
}
