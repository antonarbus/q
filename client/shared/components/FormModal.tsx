import { theme } from '@lib_instances/theme'
import { Avatar, Box, type SxProps, Typography } from '@mui/material'
import type { FormEvent, MouseEvent } from 'react'
import { useRef } from 'react'
import { BackdropWithSlidableContent } from '@shared/components/BackdropWithSlidableContent'
import { ButtonCustom } from '@shared/components/ButtonCustom'

type Props = {
  onSlideIn?: () => void
  onSlideOut?: () => void
  sx: SxProps
  avatarIcon: React.ReactNode
  headerText: string
  children: React.ReactNode
  onSubmit: (e: FormEvent) => void
  buttonText: string
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  isButtonSuccess?: boolean
  isButtonError?: boolean
}

export const FormModal = ({
  onSlideIn,
  onSlideOut,
  sx,
  avatarIcon,
  headerText,
  children,
  onSubmit,
  buttonText,
  isButtonDisabled,
  isButtonLoading,
  isButtonSuccess,
  isButtonError,
}: Props): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <BackdropWithSlidableContent
      onSlideIn={onSlideIn}
      onSlideOut={onSlideOut}
    >
      <Box
        ref={cardRef}
        onMouseDown={(e: MouseEvent): void => {
          e.stopPropagation()
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 64px)',
          maxWidth: 'calc(100vw - 64px)',
          minWidth: '300px',
          width: '500px',
          background: 'white',
          color: 'rgba(0, 0, 0, 0.87)',
          borderRadius: '4px',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          boxShadow:
            '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
          overflowY: 'hidden',
          '&:hover, &:focus-within': {
            boxShadow:
              '0px 11px 15px -7px rgb(0 0 0 / 40%), 0px 24px 38px 3px rgb(0 0 0 / 28%), 0px 9px 46px 8px rgb(0 0 0 / 24%)',
          },
          ...sx,
        }}
      >
        <Box
          className='card-header'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px 20px 5px 20px',
            borderBottom: '1px solid rgb(223, 223, 223)',
            backgroundColor: '#80808017',
          }}
        >
          <Avatar sx={{ bgcolor: theme.colors.darkBackground }}>
            {avatarIcon}
          </Avatar>
          <Typography component='h1' variant='h6' >
            {headerText}
          </Typography>
        </Box>

        <Box
          className='card-content'
          component='form'
          id='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '40px 50px',
            backgroundColor: '#8080800f',
            overflowY: 'auto',
          }}
          onSubmit={onSubmit}
        >
          {children}
        </Box>

        <Box
          className='card-footer'
          sx={{
            display: 'flex',
            padding: '15px',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid rgb(223, 223, 223)',
            backgroundColor: '#80808017',
          }}
        >
          <ButtonCustom
            isButtonDisabled={isButtonDisabled}
            isButtonLoading={isButtonLoading}
            isButtonSuccess={isButtonSuccess}
            isButtonError={isButtonError}
            form='form'
            sx={{
              width: '200px',
            }}
          >
            {buttonText}
          </ButtonCustom>
        </Box>

      </Box>
    </BackdropWithSlidableContent>
  )
}
