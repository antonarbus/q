/* eslint-disable react/jsx-max-depth */

import { Box } from '@mui/material'
import { theme } from '@shared/theme'
import type { JSX, ReactNode } from 'react'

type Props = {
  title: JSX.Element
  subtotalText: ReactNode
  subTotalPrice: JSX.Element
  hideContentForDevPurposes?: boolean
  outlinedForDevPurposes?: boolean
}

export const BoqHeaderLayout = ({
  title,
  subtotalText,
  subTotalPrice,
  hideContentForDevPurposes = false,
  outlinedForDevPurposes = false,
}: Props): JSX.Element => {
  return (
    <Box
      sx={{
        '& .layout': {
          boxShadow:
            outlinedForDevPurposes === true
              ? '0 0 1px 1px #cf5757c3 inset'
              : 'none',
        },
        '& :where(.content)': {
          visibility: hideContentForDevPurposes === true ? 'hidden' : 'visible',
        },
      }}
    >
      <Box
        className='layout title-subtotal'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '10px',
          background: '#343434e6',
          padding: '10px 15px',
          color: theme.colors.greyFont,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        <Box
          className='layout content title'
          style={{
            flexGrow: 1,
          }}
        >
          {title}
        </Box>
        <Box
          className='layout subtotal-container'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            minWidth: '150px',
            flexShrink: 0,
          }}
        >
          <Box
            className='layout content subtotal-text'
            style={{
              width: '100%',
              textAlign: 'right',
            }}
          >
            {subtotalText}
          </Box>
          <Box
            className='layout price'
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'baseline',
              gap: '10px',
              width: '100%',
            }}
          >
            <Box
              className='layout content price'
              style={{
                textAlign: 'right',
                whiteSpace: 'nowrap',
                minWidth: '60px',
              }}
            >
              {subTotalPrice}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
