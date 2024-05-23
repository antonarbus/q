import { Box } from '@mui/material'
import { type ReactNode } from 'react'
import { Items } from '@widgets/items'
import { OutlinedDivWithLabel } from '@shared/components'

export const QuotationField = (): ReactNode => {
  return (
    <BookmarkFieldLayout>
      <Items />
    </BookmarkFieldLayout>
  )
}

function BookmarkFieldLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <OutlinedDivWithLabel label='Quotation'>
      <Box
        sx={{
          overflow: 'auto',
          height: '180px',
          margin: '10px',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            width: '2000px',
          }}
        >
          {children}
        </Box>
      </Box>
    </OutlinedDivWithLabel>
  )
}
