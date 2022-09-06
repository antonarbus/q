import { Button, CircularProgress } from '@mui/material'
import { useRef } from 'react'
import { PriorityHighRounded, DoneRounded } from '@mui/icons-material'
import { useUpdateEffect } from 'react-use'
import { gsap } from 'gsap'

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
  // All other props
  [x:string]: any;
}

export function ButtonWithSuccess({ children, content, circleProgressSize, disabled, httpStatus, setHttpStatus, ...restProps }: Props) {
  const successIconRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const errorIconRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useUpdateEffect(() => {
    const timer = window.setTimeout(() => setHttpStatus(''), 3000)
    return () => clearTimeout(timer)
  }, [httpStatus])

  const iconBackgroundStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: '50%'
  }

  useUpdateEffect(() => {
    successIconRef.current && gsap.fromTo(successIconRef.current, { transformOrigin: '50% 50%', scale: 0 }, { duration: 0.5, scale: 1 })
    errorIconRef.current && gsap.fromTo(errorIconRef.current, { transformOrigin: '50% 50%', scale: 0 }, { duration: 0.5, scale: 1 })
  }, [httpStatus])

  return (
    <Button
      variant="contained"
      disabled={httpStatus !== '' || disabled}
      type='submit'
      fullWidth
      sx={{ mt: 3, mb: 2, alignSelf: 'center', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      {...restProps}
    >
      {children}
      {content}
      {httpStatus === 'loading' && (
        <CircularProgress
          size={circleProgressSize || 24}
          sx={{
            color: 'black',
            position: 'absolute'
          }}
        />
      )}
      {httpStatus === 'success' && (
        <div
          ref={successIconRef}
          css={{
            ...iconBackgroundStyle,
            height: circleProgressSize || '30px',
            width: circleProgressSize || '30px',
            background: '#4caf50'
          }}
        >
          {<DoneRounded htmlColor='#fff' />}
        </div>
      )}
      {httpStatus === 'error' && (
        <div
          ref={errorIconRef}
          css={{
            ...iconBackgroundStyle,
            height: circleProgressSize || '30px',
            width: circleProgressSize || '30px',
            background: '#f77d7d'
          }}
        >
          {<PriorityHighRounded htmlColor='#fff' />}
        </div>
      )}
    </Button>
  )
}
