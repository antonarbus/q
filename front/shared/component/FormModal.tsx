/* eslint-disable react/jsx-max-depth */
import { theme } from '@shared/theme'
import { IoClose } from 'react-icons/io5'
import { AnimatePresence, motion } from 'motion/react'
import type { AnimationScope } from 'motion-dom'
import { Children } from 'react'
import type {
  JSX,
  ReactNode,
  ComponentRef,
  RefObject,
  CSSProperties,
  MouseEvent,
  FormEvent,
} from 'react'
import { BackdropWithSlidableModal } from './BackdropWithSlidableModal'
import { ButtonCustom } from './ButtonCustom'
import { cls } from '@shared/const/cls'
import {
  Avatar,
  Box,
  type SxProps,
  Typography,
  IconButton,
} from '@mui/material'

type Props = {
  width?: CSSProperties['width']
  paddingContent?: CSSProperties['width']
  sx?: SxProps
  headerIcon: ReactNode
  headerText: string
  children: ReactNode
  onUnmount?: () => void
  onSubmit?: (e: FormEvent) => void
  onCloseClick?: (e: MouseEvent) => void
  buttonText?: string
  isButtonDisabled?: boolean
  isButtonLoading?: boolean
  isButtonSuccess?: boolean
  isButtonError?: boolean
  modalRef: RefObject<ComponentRef<'div'> | null> | AnimationScope
  shouldUnmountOnClickAway: boolean
  shouldUnmountOnEsc: boolean
}

export const FormModal = ({
  width,
  sx,
  headerIcon,
  headerText,
  children,
  onUnmount,
  onSubmit,
  onCloseClick,
  buttonText,
  isButtonDisabled,
  isButtonLoading,
  isButtonSuccess,
  isButtonError,
  modalRef,
  paddingContent,
  shouldUnmountOnClickAway,
  shouldUnmountOnEsc,
}: Props): JSX.Element => {
  return (
    <BackdropWithSlidableModal
      onUnmount={onUnmount}
      shouldUnmountOnClickAway={shouldUnmountOnClickAway}
      shouldUnmountOnEsc={shouldUnmountOnEsc}
    >
      <Box
        className={cls.formModal}
        onMouseDown={(event: MouseEvent): void => {
          event.stopPropagation()
        }}
        ref={modalRef}
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
          overflowY: 'visible',
          boxShadow:
            '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
          '&:hover, &:focus-within': {
            boxShadow:
              '0px 11px 15px -7px rgb(0 0 0 / 40%), 0px 24px 38px 3px rgb(0 0 0 / 28%), 0px 9px 46px 8px rgb(0 0 0 / 24%)',
          },
          // eslint-disable-next-line @typescript-eslint/no-misused-spread
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
            position: 'relative',
          }}
        >
          <Avatar sx={{ bgcolor: theme.colors.darkBackground }}>
            {headerIcon}
          </Avatar>
          <Typography
            component='h1'
            variant='h6'
          >
            {headerText}
          </Typography>
          <IconButton
            onClick={onCloseClick}
            sx={{
              position: 'absolute',
              top: '-35px',
              right: '-35px',
            }}
          >
            <IoClose
              css={{
                color: '#bebebe',
                ':hover': {
                  color: '#dedede',
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
            padding: paddingContent ?? '40px 50px',
            backgroundColor: '#8080800f',
            overflowY: 'auto',
            '> *': {
              marginTop: '25px',
              ':first-of-type': {
                marginTop: '0px !important',
              },
            },
          }}
          id='form'
          onSubmit={onSubmit}
        >
          <AnimatePresence initial={false}>
            {Children.map(children, (child, index) => {
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
        {buttonText !== undefined && (
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
              form='form'
              isButtonDisabled={
                Boolean(isButtonDisabled) || Boolean(isButtonLoading)
              }
              isButtonError={isButtonError}
              isButtonLoading={isButtonLoading}
              isButtonSuccess={isButtonSuccess}
              sx={{ width: '200px' }}
            >
              {buttonText}
            </ButtonCustom>
          </Box>
        )}
      </Box>
    </BackdropWithSlidableModal>
  )
}
