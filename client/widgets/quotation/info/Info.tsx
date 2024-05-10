import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { type ReactNode } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { openQuotationInfoModal } from '@features/quotation/open_info_quotation_modal'

export const Info = (): ReactNode => {
  const quotationId = useSelectorTyped(state => state.quotation.id)

  if (quotationId === '' || quotationId === undefined) return null

  return (
    <Box
      component='button'
      onClick={() => {
        openQuotationInfoModal()
      }}
      sx={{
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        gap: '5px',
        width: '70px',
        ':hover svg': {
          fill: '#3c5588 !important',
        },
      }}
    >
      <FaInfoCircle
        style={{
          fill: '#6488cf',
        }}
      />
      {quotationId}
    </Box>
  )
}
