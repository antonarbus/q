import { useIsCopyModalVisible } from '@entities/copy'
import { useSelector } from '@shared/lib/redux'
import { Box, Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import { route } from '@shared/consts/route'
import { PiGlobeX, PiGlobe, PiInfoBold } from 'react-icons/pi'
import { BsPersonFillLock } from 'react-icons/bs'

export const InfoRight = (): React.ReactNode => {
  const quotationId = useSelector((state) => state.quotation.id)
  const access = useSelector((state) => state.quotation.access)
  const disabled = useIsCopyModalVisible()

  return (
    <Box
      sx={{
        all: 'unset',
        display: 'flex',
        justifyContent: 'flex-end',
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
        <Tooltip title='Info'>
          <Link
            style={{ lineHeight: 0.1, height: '100%' }}
            to={disabled === true ? '' : `./${route.info}`}
          >
            <PiInfoBold
              css={{
                height: '100%',
                width: 'auto',
                fill: disabled === true ? '#c6c6c6' : '#6488cf',
                ...(disabled === false && {
                  ':hover': {
                    fill: '#3c5588 !important',
                  },
                }),
              }}
            />
          </Link>
        </Tooltip>
        <Tooltip title='Share'>
          <Link
            css={{
              lineHeight: 0.1,
              height: '100%',
              color: access.level === 'everyone' ? '#6488cf' : 'grey',
              ':hover': {
                color: '#3c5588 !important',
              },
            }}
            to={disabled === true ? '' : `./${route.share}`}
          >
            {access.level === 'everyone' && (
              <PiGlobe
                css={{
                  height: '100%',
                  width: 'auto',
                }}
              />
            )}
            {access.level === 'custom' && (
              <BsPersonFillLock
                css={{
                  height: '100%',
                  width: 'auto',
                }}
              />
            )}
            {access.level === 'nobody' && (
              <PiGlobeX
                css={{
                  height: '100%',
                  width: 'auto',
                }}
              />
            )}
          </Link>
        </Tooltip>
        <Tooltip title='Quotation ID'>
          <Box
            sx={{
              fontWeight: 500,
              color: 'grey',
            }}
          >
            {quotationId}
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}
