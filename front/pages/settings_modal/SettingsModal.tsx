import { getState } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { IoSettingsOutline } from 'react-icons/io5'
import { Avatar, Box, Collapse } from '@mui/material'
import { format } from 'bytes'
import { Fragment, useRef, useState } from 'react'
import { GrStorage } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useGetFilesStatsQuery } from '@entities/user'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { CardCustom } from '@shared/components/CardCustom'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'
import { getFileUrl } from '@features/file/download_file'
import { DeleteFileIcon } from '@features/file/delete_file'

export const SettingsModal = (): React.JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [collapseOpen, setCollapseOpen] = useState(false)
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
        sx={{
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {isPending && (
            <RotatingLoaderIcon
              style={{
                height: '20px',
                width: '20px',
              }}
            />
          )}
          {isSuccess && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (data.filesInfo.length > 0) {
                    setCollapseOpen(!collapseOpen)
                  }
                }}
              >
                <GrStorage />
                <Box>{data.fileStats.fileCount} files</Box>
                <Box>
                  {format(data.fileStats.totalSize, {
                    unit: 'mb',
                    thousandsSeparator: ' ',
                    unitSeparator: ' ',
                  })}
                </Box>
                {data.filesInfo.length > 0 && collapseOpen ? (
                  <MdExpandLess />
                ) : (
                  <MdExpandMore />
                )}
              </Box>
              <Collapse
                in={collapseOpen}
                timeout='auto'
                unmountOnExit
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto 20px',
                    gap: '10px',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {data.filesInfo.map((item) => {
                    return (
                      <Fragment key={item.fileName}>
                        <FiFileText color='grey' />
                        <a
                          href={getFileUrl({ fileName: item.fileName })}
                          target='_blank'
                          rel='noreferrer'
                          style={{
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.fileName}
                        </a>
                        <Box
                          sx={{
                            textAlign: 'right',
                            fontSize: '12px',
                          }}
                        >
                          {format(item.fileSize, {
                            unit: item.fileSize < 1_048_576 ? 'kb' : 'mb',
                            thousandsSeparator: ' ',
                            unitSeparator: ' ',
                          })}
                        </Box>
                        <DeleteFileIcon
                          fileName={item.fileName}
                          fileSize={item.fileSize}
                        />
                      </Fragment>
                    )
                  })}
                </Box>
              </Collapse>
            </>
          )}
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
