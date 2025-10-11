import { useGetFileListStatsQuery } from '@entities/file/api/useGetFileListStatsQuery'
import { DeleteFileIcon } from '@features/file/delete-file'
import { Avatar, Box, Collapse } from '@mui/material'
import { BackdropWithSlidableModal } from '@shared/component/BackdropWithSlidableModal'
import { CardCustom } from '@shared/component/CardCustom'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { getState } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { format } from 'bytes'
import { type JSX, useMemo, useRef, useState } from 'react'
import { FiFileText } from 'react-icons/fi'
import { GrStorage } from 'react-icons/gr'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const SettingsModal = (): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [collapseOpen, setCollapseOpen] = useState(false)
  const getFileListStatsQuery = useGetFileListStatsQuery()

  const totalSize = useMemo(() => {
    const size = (getFileListStatsQuery.data?.fileList ?? []).reduce(
      (accumulator, item) => {
        const incrementedSum = accumulator + item.size

        return incrementedSum
      },
      0,
    )

    return size
  }, [getFileListStatsQuery.data])

  const totalCount = getFileListStatsQuery.data?.fileList.length ?? 0

  return (
    <BackdropWithSlidableModal
      onUnmount={(): void => {
        void navigate('..')
      }}
      shouldUnmountOnClickAway
      shouldUnmountOnEsc
    >
      <CardCustom
        logo={
          <Avatar sx={{ margin: 1, bgcolor: theme.colors.darkBackground }}>
            <IoSettingsOutline />
          </Avatar>
        }
        reference={cardRef}
        sx={{
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
        title={getState().user.email}
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
          {getFileListStatsQuery.isPending === true ? (
            <RotatingLoaderIcon
              style={{
                height: '20px',
                width: '20px',
              }}
            />
          ) : null}
          {getFileListStatsQuery.isSuccess === true ? (
            <>
              <Box
                onClick={() => {
                  if (totalCount > 0) {
                    setCollapseOpen(collapseOpen === false)
                  }
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                }}
              >
                <GrStorage />
                <Box>{totalCount} files</Box>
                <Box>
                  {format(totalSize, {
                    unit: totalSize < 1_048_576 ? 'kb' : 'mb',
                    thousandsSeparator: ' ',
                    unitSeparator: ' ',
                  })}
                </Box>
                {totalCount > 0 && collapseOpen ? (
                  <MdExpandLess />
                ) : (
                  <MdExpandMore />
                )}
              </Box>
              <Collapse
                in={collapseOpen}
                sx={{
                  width: '100%',
                }}
                timeout='auto'
                unmountOnExit
              >
                {getFileListStatsQuery.data.fileList.map((item) => {
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        gap: '5px',
                        padding: '4px',
                        borderRadius: '2px',
                        ':hover': {
                          background: '#a7a7a729',
                        },
                      }}
                    >
                      <FiFileText color='grey' style={{ width: '20px' }} />
                      <a
                        href={`/uploads/${item.id}`}
                        style={{
                          fontSize: '12px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1,
                        }}
                      >
                        {item.name}
                      </a>
                      <Box
                        sx={{
                          textAlign: 'right',
                          fontSize: '12px',
                          width: '50px',
                        }}
                      >
                        {format(item.size, {
                          unit: item.size < 1_048_576 ? 'kb' : 'mb',
                          thousandsSeparator: ' ',
                          unitSeparator: ' ',
                          decimalPlaces: 0,
                        })}
                      </Box>
                      <DeleteFileIcon fileId={item.id} />
                    </Box>
                  )
                })}
              </Collapse>
            </>
          ) : null}
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
