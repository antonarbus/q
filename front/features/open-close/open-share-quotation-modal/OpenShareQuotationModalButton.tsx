import { IconButton, Tooltip } from '@mui/material'
import type { FC } from 'react'
import { openShareQuotationOrLoginModal } from './openShareQuotationOrLoginModal'
import { FaRegShareFromSquare } from 'react-icons/fa6'

export const OpenShareQuotationModalButton: FC = () => {
  return (
    <Tooltip title='Share'>
      <IconButton onClick={openShareQuotationOrLoginModal} size='small'>
        <FaRegShareFromSquare />
      </IconButton>
    </Tooltip>
  )
}
