import { useIsCopyModalVisible } from '@entities/copy'
import { useSelector } from '@shared/lib/redux'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { PiGlobeX, PiGlobe, PiInfoBold } from 'react-icons/pi'

export const InfoRight = (): React.ReactNode => {
  const quotationId = useSelector((state) => state.quotation.id)
  const disabled = useIsCopyModalVisible()
  const sharedWith = useSelector((state) => state.quotation.sharedWith)
  const isPublic = (sharedWith ?? []).length > 0

  return (
    <Box
      sx={{
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        width: '100px',
        maxWidth: '100px',
        height: '18px',
      }}
    >
      <Box
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexGrow: 1,
          display: 'flex',
          gap: '5px',
          height: '100%',
        }}
      >
        <Link
          to={disabled ? '' : `./${route.info}`}
          style={{ lineHeight: 0.1, height: '100%' }}
        >
          <PiInfoBold
            css={{
              height: '100%',
              width: 'auto',
              fill: disabled ? '#c6c6c6' : '#6488cf',
              ...(!disabled && {
                ':hover': {
                  fill: '#3c5588 !important',
                },
              }),
            }}
          />
        </Link>
        <Link
          to={disabled ? '' : `./${route.share}`}
          css={{
            lineHeight: 0.1,
            height: '100%',
            color: isPublic ? '#6488cf' : 'grey',
            ':hover': {
              color: '#3c5588 !important',
            },
          }}
        >
          {isPublic ? (
            <PiGlobe
              css={{
                height: '100%',
                width: 'auto',
              }}
            />
          ) : (
            <PiGlobeX
              css={{
                height: '100%',
                width: 'auto',
              }}
            />
          )}
        </Link>
        <Box
          sx={{
            fontWeight: 500,
            color: 'grey',
          }}
        >
          {quotationId}
        </Box>
      </Box>
    </Box>
  )
}
