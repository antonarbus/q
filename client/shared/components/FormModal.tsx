import { theme } from '@lib_instances/theme'
import { Close } from '@mui/icons-material'
import { Avatar, Box, type SxProps, Typography, IconButton } from '@mui/material'
import { BackdropWithSlidableModal } from './BackdropWithSlidableModal'
import { ButtonCustom } from './ButtonCustom'

type Props = {
  onSlideModalInComplete?: () => void
  onSlideModalOutComplete?: () => void
  width?: React.CSSProperties['width']
  paddingContent?: React.CSSProperties['width']
  sx?: SxProps
  headerIcon: React.ReactNode
  headerText: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent) => void
  onCloseClick: (e: React.MouseEvent) => void
  buttonText: string
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  isButtonSuccess?: boolean
  isButtonError?: boolean
  modalRef: React.RefObject<HTMLDivElement>
}

export const FormModal = ({
  onSlideModalInComplete,
  onSlideModalOutComplete,
  width,
  sx,
  headerIcon,
  headerText,
  children,
  onSubmit,
  onCloseClick,
  buttonText,
  isButtonDisabled,
  isButtonLoading,
  isButtonSuccess,
  isButtonError,
  modalRef,
  paddingContent,
}: Props): JSX.Element => {
  return (
    <BackdropWithSlidableModal
      onSlideModalInComplete={onSlideModalInComplete}
      onSlideModalOutComplete={onSlideModalOutComplete}
    >
      <Box
        ref={modalRef}
        onMouseDown={(e: React.MouseEvent): void => {
          e.stopPropagation()
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 80px)',
          maxWidth: 'calc(100vw - 64px)',
          minWidth: '300px',
          width: width ?? '500px',
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
            {headerIcon}
          </Avatar>
          <Typography component='h1' variant='h6' >
            {headerText}
          </Typography>
          <IconButton
            sx={{
              position: 'absolute',
              top: '-35px',
              right: '-35px',
            }}
            onClick={onCloseClick}
          >
            <Close
              sx={{
                color: '#aaaaaa',
                ':hover': {
                  color: '#c1c1c1',
                },
              }}
            />
          </IconButton>
        </Box>
        <Box
          className='card-content'
          component='form'
          id='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            padding: paddingContent ?? '40px 50px',
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
    </BackdropWithSlidableModal>
  )
}
