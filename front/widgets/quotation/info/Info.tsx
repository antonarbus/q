import { useIsCopyModalVisible } from '@entities/copy'
import { openQuotationInfoModal } from '@features/open_close/open_info_modal'
import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { FaInfoCircle } from 'react-icons/fa'

const DivForSymmetry = (): JSX.Element => <div style={{ width: '80px' }} />

export const Info = (): React.ReactNode => {
  const quotationId = useSelectorTyped((state) => state.quotation.id)
  const isCopyModalVisible = useIsCopyModalVisible()
  const disabled = isCopyModalVisible

  if (!quotationId) return <DivForSymmetry />

  return (
    <Box
      component='button'
      onClick={() => {
        if (disabled) return

        openQuotationInfoModal()
      }}
      sx={{
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        gap: '5px',
        width: '80px',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <FaInfoCircle
          css={{
            fill: disabled ? '#c6c6c6' : '#6488cf',
            ...(!disabled && {
              ':hover': {
                fill: '#3c5588 !important',
              },
            }),
          }}
        />
      </Box>
      {quotationId}
    </Box>
  )
}
