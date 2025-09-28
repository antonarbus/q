/* eslint-disable react/jsx-max-depth */
import { Box } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { OutlinedDivWithLabel } from '@shared/component/OutlinedDivWithLabel'
import type { JSX,ReactNode } from 'react'

type Props = {
  sharedWithRadioButtons: ReactNode
  sharedWithEmailInputField: ReactNode
  sharedWithEmailList: ReactNode
}

export const Layout = (props: Props): JSX.Element => {
  return (
    <OutlinedDivWithLabel label='Share'>
      <Box
        sx={{
          padding: '10px 10px 10px 20px',
        }}
      >
        <AnimatePresence initial={false}>
          <Box
            key='radio-buttons'
            sx={{
              display: 'flex',
            }}
          >
            {props.sharedWithRadioButtons}
            {props.sharedWithEmailInputField}
          </Box>
          {props.sharedWithEmailList}
        </AnimatePresence>
      </Box>
    </OutlinedDivWithLabel>
  )
}
