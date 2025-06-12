/* eslint-disable react/jsx-max-depth */
import { Box } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { OutlinedDivWithLabel } from '@shared/components/OutlinedDivWithLabel'

type Props = {
  sharedWithRadioButtons: React.ReactNode
  sharedWithEmailInputField: React.ReactNode
  sharedWithEmailList: React.ReactNode
}

export const Layout = (props: Props): React.JSX.Element => {
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
