import {
  Avatar,
  Box,
  IconButton,
  type CSSObject,
  Typography,
} from '@mui/material'
import { cls } from '@front/shared/cls'
import { theme } from '@front/shared/theme'
import type { AnimationScope } from 'motion'
import { AnimatePresence, motion } from 'motion/react'
import { Children } from 'react'
import { IoClose } from 'react-icons/io5'
import { BackdropWithSlidableModal } from './BackdropWithSlidableModal'
import { ButtonCustom } from './ButtonCustom'

type Props = {
  width?: CSSObject['width']
  paddingContent?: CSSObject['width']
  sx?: CSSObject
  headerIcon: React.ReactNode
  headerText: string
  children: React.ReactNode
  onUnmount?: () => void
  onSubmit?: (e: React.SubmitEvent) => void
  onCloseClick?: (e: React.MouseEvent) => void
  buttonText?: string
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  isButtonSuccess?: boolean
  isButtonError?: boolean
  modalRef: React.RefObject<React.ComponentRef<'div'> | null> | AnimationScope
  shouldUnmountOnClickAway: boolean
  shouldUnmountOnEsc: boolean
}

export const FormModal = (props: Props): React.JSX.Element => {
  const FORM_ID = 'form-id'

  return (
    <BackdropWithSlidableModal
      onUnmount={props.onUnmount}
      shouldUnmountOnClickAway={props.shouldUnmountOnClickAway}
      shouldUnmountOnEsc={props.shouldUnmountOnEsc}
    >
      <Box
        className={cls.formModal}
        onMouseDown={(event: React.MouseEvent): void => {
          event.stopPropagation()
        }}
        ref={props.modalRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 80px)',
          maxWidth: 'calc(100vw - 64px)',
          minWidth: '300px',
          width: props.width ?? '500px',
          background: 'rgba(255, 255, 255, 0.7)',
          color: 'rgba(0, 0, 0, 0.87)',
          borderRadius: '12px',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          overflowY: 'visible',
          backdropFilter: 'blur(4px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow:
            '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
          '&:hover, &:focus-within': {
            boxShadow:
              '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
          },
          ...props.sx,
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
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            position: 'relative',
          }}
        >
          <Avatar sx={{ bgcolor: theme.colors.darkBackground }}>
            {props.headerIcon}
          </Avatar>
          <Typography component='h1' variant='h6'>
            {props.headerText}
          </Typography>
          <IconButton
            onClick={props.onCloseClick}
            sx={{
              position: 'absolute',
              top: '-35px',
              right: '-35px',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <IoClose
              css={{
                color: '#000000',
                fontSize: '28px',
                filter: 'drop-shadow(0px 0px 2px rgba(255, 255, 255, 0.8))',
                ':hover': {
                  color: '#333333',
                  filter: 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 1))',
                },
              }}
            />
          </IconButton>
        </Box>
        <Box
          className='card-content'
          component='form'
          css={{
            display: 'flex',
            flexDirection: 'column',
            padding: props.paddingContent ?? '40px 50px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            overflowY: 'auto',
            '> *': {
              marginTop: '25px',
              ':first-of-type': {
                marginTop: '0px !important',
              },
            },
          }}
          id={FORM_ID}
          onSubmit={props.onSubmit}
        >
          <AnimatePresence initial={false}>
            {Children.map(props.children, (child, index) => {
              if (child === null) {
                return null
              }

              return (
                <motion.div
                  animate={{
                    height: 'auto',
                    marginTop: '25px',
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    marginTop: 0,
                    opacity: 0,
                  }}
                  initial={{
                    height: 0,
                    marginTop: 0,
                    opacity: 0,
                  }}
                  key={`form-child-${String(index)}`}
                >
                  {child}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </Box>
        {props.buttonText !== undefined && (
          <Box
            className='card-footer'
            sx={{
              display: 'flex',
              padding: '15px',
              justifyContent: 'center',
              alignItems: 'center',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <ButtonCustom
              form={FORM_ID}
              isButtonDisabled={
                Boolean(props.isButtonDisabled) ||
                Boolean(props.isButtonLoading)
              }
              isButtonError={props.isButtonError}
              isButtonLoading={props.isButtonLoading}
              isButtonSuccess={props.isButtonSuccess}
              sx={{ width: '200px' }}
            >
              {props.buttonText}
            </ButtonCustom>
          </Box>
        )}
      </Box>
    </BackdropWithSlidableModal>
  )
}
