import { getState } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { IoSettingsOutline } from 'react-icons/io5'
import { Avatar, Box } from '@mui/material'
import bytes from 'bytes'
import { useRef } from 'react'
import { GrStorage } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useGetFilesStatsQuery } from '@entities/user'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { CardCustom } from '@shared/components/CardCustom'

export const SettingsModal = (): React.JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { data, isSuccess, isPending } = useGetFilesStatsQuery()

  return (
    <BackdropWithSlidableModal
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
      onUnmount={(): void => {
        void navigate('..')
      }}
    >
      <CardCustom
        reference={cardRef}
        title={getState().user.email}
        logo={
          <Avatar sx={{ m: 1, bgcolor: theme.colors.darkBackground }}>
            <IoSettingsOutline />
          </Avatar>
        }
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {isPending && (
            <>
              <RotatingLoaderIcon
                style={{
                  height: '30px',
                  width: '30px',
                }}
              />
              <Box>Please wait...</Box>
            </>
          )}
          {isSuccess && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <GrStorage />
              <Box>{data.fileStats.fileCount} files</Box>
              <Box>
                {bytes.format(data.fileStats.totalSize, {
                  unit: 'mb',
                  thousandsSeparator: ' ',
                  unitSeparator: ' ',
                })}
              </Box>
            </Box>
          )}
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
