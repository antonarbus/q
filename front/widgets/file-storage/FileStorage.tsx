import { useGetFileListStatsQuery } from '@front/entities/file/api/useGetFileListStatsQuery'
import { DeleteFileIcon } from '@front/features/file/delete-file/DeleteFileIcon'
import { Box, Collapse } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { format } from 'bytes'
import { FiFileText } from 'react-icons/fi'
import { GrStorage } from 'react-icons/gr'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import type { FC } from 'react'
import { useState } from 'react'

export const FileStorage: FC = () => {
  const getFileListStatsQuery = useGetFileListStatsQuery()
  const [collapseOpen, setCollapseOpen] = useState(false)

  const totalSize = (getFileListStatsQuery.data?.fileList ?? []).reduce(
    (acc, item) => acc + item.size,
    0,
  )

  const totalCount = getFileListStatsQuery.data?.fileList.length ?? 0

  if (getFileListStatsQuery.isPending === true) {
    return <RotatingLoaderIcon style={{ height: '20px', width: '20px' }} />
  }

  if (getFileListStatsQuery.isSuccess !== true) {
    return null
  }

  return (
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
        {totalCount > 0 && collapseOpen ? <MdExpandLess /> : <MdExpandMore />}
      </Box>
      <Collapse in={collapseOpen} sx={{ width: '100%' }} timeout='auto' unmountOnExit={true}>
        {getFileListStatsQuery.data.fileList.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                gap: '5px',
                padding: '4px',
                borderRadius: '2px',
                ':hover': { background: '#a7a7a729' },
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
              <Box sx={{ textAlign: 'right', fontSize: '12px', width: '50px' }}>
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
  )
}
