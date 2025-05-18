import { getState } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import { IoSettingsOutline } from 'react-icons/io5'
import { Avatar, Box, Collapse } from '@mui/material'
import { format } from 'bytes'
import { Fragment, useMemo, useRef, useState } from 'react'
import { GrStorage } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useGetFilesStatsQuery } from '@entities/user'
import { BackdropWithSlidableModal } from '@shared/components/BackdropWithSlidableModal'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { CardCustom } from '@shared/components/CardCustom'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'
import { DeleteFileIcon } from '@features/file/delete_file'

export const SettingsModal = (): React.JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [collapseOpen, setCollapseOpen] = useState(false)
  const { data, isSuccess, isPending } = useGetFilesStatsQuery()

  const totalSize = useMemo(() => {
    const size = (data?.fileList ?? []).reduce((accumulator, item) => {
      const incrementedSum = accumulator + item.size

      return incrementedSum
    }, 0)

    return size
  }, [data])

  const totalCount = data?.fileList.length ?? 0

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
          <Avatar sx={{ margin: 1, bgcolor: theme.colors.darkBackground }}>
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
                  if (totalCount > 0) {
                    setCollapseOpen(collapseOpen === false)
                  }
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
                timeout='auto'
                unmountOnExit
                sx={{
                  width: '100%',
                }}
              >
                {data.fileList.map((item) => {
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
                      <FiFileText
                        color='grey'
                        style={{ width: '20px' }}
                      />
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
          )}
        </Box>
      </CardCustom>
    </BackdropWithSlidableModal>
  )
}
