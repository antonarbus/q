import { Button, CircularProgress } from '@mui/material'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useRef } from 'react'
import { useUpdateEffect } from 'react-use'
import './successErrorIcons.css'

type HttpStatusType = '' | 'error' | 'loading' | 'success'

type Props = {
  [x: string]: unknown // all other ...restProps props
  children?: ReactNode
  content?: ReactNode
  circleProgressSize?: number | string
  disabled?: boolean
  httpStatus?: HttpStatusType
  setHttpStatus?: Dispatch<SetStateAction<HttpStatusType>>
}

export const ButtonCustom = ({
  children,
  content,
  circleProgressSize,
  disabled,
  httpStatus,
  setHttpStatus,
  ...restProps
}: Props): JSX.Element => {
  const successIconRef = useRef<HTMLDivElement>(null)
  const errorIconRef = useRef<HTMLDivElement>(null)

  useUpdateEffect(() => {
    const timer = window.setTimeout(() => {
      setHttpStatus?.('')
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [httpStatus])

  const iconBackgroundStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: '50%',
  }

  const isNetworkProgress = ['loading', 'error', 'success'].includes(httpStatus ?? 'no network status')

  return (
    <Button
      variant='contained'
      disabled={isNetworkProgress || disabled}
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
          size={circleProgressSize ?? 30}
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
            height: circleProgressSize ?? 30,
            width: circleProgressSize ?? 30,
          }}
        >
          {
            <svg className='checkmark' viewBox='0 0 52 52'>
              <circle
                className='checkmark__circle'
                cx='26'
                cy='26'
                r='25'
                fill='none'
              />
              <path
                className='checkmark__check'
                fill='none'
                d='M14.1 27.2l7.1 7.2 16.7-16.8'
              />
            </svg>
          }
        </div>
      )}
      {httpStatus === 'error' && (
        <div
          ref={errorIconRef}
          css={{
            ...iconBackgroundStyle,
            height: circleProgressSize ?? 30,
            width: circleProgressSize ?? 30,
          }}
        >
          {
            <svg viewBox='0 0 52 52' className='checkmark'>
              <circle
                cx='26'
                cy='26'
                r='25'
                fill='none'
                className='checkmark__circle checkmark__cross'
              ></circle>
              <path
                fill='none'
                d='M 12,12 L 40,40 M 40,12 L 12,40'
                className='checkmark__check'
              ></path>
            </svg>
          }
        </div>
      )}
    </Button>
  )
}
