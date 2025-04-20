import { Tooltip, Chip } from '@mui/material'
import type { ResBody as GetQuotationsRes } from '@back/api/quotation/getQuotationsHandler'
import { getState } from '@shared/lib/redux'
import { FiFileText } from 'react-icons/fi'
import { instance } from '@shared/instance'
import { queryKey } from '@shared/consts/queryKey'
import { MdDeleteOutline } from 'react-icons/md'
import { HiDownload } from 'react-icons/hi'
import { useState } from 'react'
import { useDeleteFileMutation } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import type { FileInfo } from '@entities/quotation/types'
import { useUpdateEffect } from 'react-use'
import { produce } from 'immer'

type Props = {
  fileInfo: FileInfo
}

export const FileChip = ({ fileInfo }: Props): React.ReactNode => {
  const [icon, setIcon] = useState(<FiFileText style={{ height: '12px' }} />)

  const {
    mutate: deleteFile,
    data,
    isPending,
    isSuccess,
  } = useDeleteFileMutation()

  useUpdateEffect(() => {
    if (isSuccess && data.quotationsModifiedCount > 1) {
      instance.queryClient.setQueriesData<GetQuotationsRes>(
        { queryKey: [queryKey.getQuotations] },
        (cacheData) => {
          const updatedCacheData = produce(cacheData, (draft) => {
            if (draft?.quotations === undefined) {
              return
            }

            draft.quotations.forEach((quotation) => {
              if (quotation.files) {
                quotation.files = quotation.files.filter(
                  (file) => file.fileName !== fileInfo.fileName,
                )
              }
            })
          })

          return updatedCacheData
        },
      )
    }
  }, [isSuccess])

  if (isSuccess) {
    return null
  }

  return (
    <Chip
      key={fileInfo.fileName}
      icon={icon}
      variant='outlined'
      onMouseEnter={() => {
        setIcon(
          <Tooltip
            title={`Download ${fileInfo.fileSizeInMb} Mb`}
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
        isPending ? (
          <RotatingLoaderIcon style={{ marginRight: '4px' }} />
        ) : (
          <Tooltip
            title={`Delete`}
            placement='top'
          >
            <MdDeleteOutline
              onMouseEnter={() => {
                setIcon(<FiFileText style={{ height: '12px' }} />)
              }}
              onMouseLeave={() => {
                setIcon(
                  <Tooltip
                    title={`Download ${fileInfo.fileSizeInMb} Mb`}
                    placement='top'
                  >
                    <HiDownload style={{ height: '16px' }} />
                  </Tooltip>,
                )
              }}
            />
          </Tooltip>
        )
      }
      component='a'
      href={`https://storage.googleapis.com/quotation-app-bucket/${getState().user.email}/files/${fileInfo.fileName}`}
      label={fileInfo.fileName}
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
              (file) => file.fileName === fileInfo.fileName,
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

        deleteFile({ fileName: fileInfo.fileName })
      }}
    />
  )
}
