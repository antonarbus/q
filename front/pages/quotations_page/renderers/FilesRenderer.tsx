import { Tooltip, Box, Chip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type {
  QuotationPick,
  ResBody as GetQuotationsRes,
} from '@back/api/quotation/getQuotationsHandler'
import { getState } from '@shared/lib/redux'
import { FiFileText } from 'react-icons/fi'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/consts/queryKey'
import uniqBy from 'lodash.uniqby'
import { MdDeleteOutline } from 'react-icons/md'
import { HiDownload } from 'react-icons/hi'
import { useState } from 'react'

const DownloadIcon = ({
  fileSize,
}: {
  fileSize: number
}): React.JSX.Element => {
  return (
    <Tooltip
      title={`Download ${fileSize} Mb`}
      placement='top'
    >
      <HiDownload style={{ height: '16px' }} />
    </Tooltip>
  )
}

export const FilesRenderer = (
  params: ICellRendererParams<QuotationPick, QuotationPick['files']>,
): React.ReactNode => {
  const files = params.value

  if (!files || files.length === 0) {
    return null
  }

  const links = uniqBy(files, 'fileName').map((item) => {
    const [icon, setIcon] = useState(<FiFileText style={{ height: '12px' }} />)

    return (
      <Chip
        key={item.fileName}
        icon={icon}
        onMouseEnter={() => {
          setIcon(
            <Tooltip
              title={`Download ${item.fileSizeInMb} Mb`}
              placement='top'
            >
              <HiDownload style={{ height: '16px' }} />
            </Tooltip>,
          )
        }}
        onMouseLeave={() => {
          setIcon(<FiFileText style={{ height: '12px' }} />)
        }}
        deleteIcon={
          <Tooltip
            title={`Delete`}
            placement='top'
          >
            <MdDeleteOutline />
          </Tooltip>
        }
        component='a'
        href={`https://storage.googleapis.com/quotation-app-bucket/${getState().user.email}/files/${item.fileName}`}
        label={item.fileName}
        size='small'
        sx={{ cursor: 'pointer' }}
        onDelete={(e: Event) => {
          e.preventDefault()

          const shouldDeleteFile = confirm('Delete file?')

          if (!shouldDeleteFile) {
            return
          }

          const quotationsRes =
            instance.queryClient.getQueryData<GetQuotationsRes>([
              queryKey.getQuotations,
            ])

          const quotations = quotationsRes?.quotations

          if (quotations) {
            const quotationsWithSameFile = quotations.filter((quotation) => {
              const filesInQuotation = quotation.files ?? []

              const hasSameFile = filesInQuotation.some(
                (file) => file.fileName === item.fileName,
              )

              return hasSameFile
            })

            if (quotationsWithSameFile.length > 1) {
              const confirmDeletionAtMultipleFiles = confirm(
                `Same file is used in ${quotationsWithSameFile.length} quotations. Are you sure?`,
              )

              if (!confirmDeletionAtMultipleFiles) {
                return
              }
            }
          }

          alert('Under development')
        }}
      />
    )
  })

  return (
    <Box sx={{ width: '100%', overflow: 'auto', display: 'flex', gap: '3px' }}>
      {links}
    </Box>
  )
}
