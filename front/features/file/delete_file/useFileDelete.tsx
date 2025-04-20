import { useDeleteFileMutation } from '@entities/quotation'
import { instance } from '@shared/instance'
import type { ResBody as GetQuotationsRes } from '@back/api/quotation/getQuotationsHandler'
import type { ResBody as GetFilesStatsRes } from '@back/api/file/getFilesStatsHandler'
import { queryKey } from '@shared/consts/queryKey'
import { useCallback } from 'react'
import type { FileInfo } from '@entities/quotation/types'
import { useUpdateEffect } from 'react-use'
import { produce } from 'immer'
import { toast } from 'sonner'

type Props = {
  fileName: FileInfo['fileName']
  fileSize: FileInfo['fileSize']
}

type Res = {
  onDeleteClick: (e: React.MouseEvent) => void
  isSuccess: boolean
  isPending: boolean
}

export const useFileDelete = ({ fileName, fileSize }: Props): Res => {
  const {
    mutate: deleteFile,
    isPending,
    isSuccess,
    isError,
  } = useDeleteFileMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
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
                  (file) => file.fileName !== fileName,
                )
              }
            })
          })

          return updatedCacheData
        },
      )

      instance.queryClient.setQueriesData<GetFilesStatsRes>(
        { queryKey: [queryKey.getFilesStats] },
        (cacheData) => {
          const updatedCacheData = produce(cacheData, (draft) => {
            if (draft?.filesInfo !== undefined) {
              draft.filesInfo = draft.filesInfo.filter(
                (item) => item.fileName !== fileName,
              )
            }

            if (draft?.fileStats !== undefined) {
              draft.fileStats.fileCount -= 1
              draft.fileStats.totalSize -= fileSize
            }
          })

          return updatedCacheData
        },
      )
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error('Problem during deletion')
    }
  }, [isError])

  const onDeleteClick = useCallback((e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    const shouldDeleteFile = confirm('Delete file?')

    if (!shouldDeleteFile) {
      return
    }

    const quotationsRes = instance.queryClient.getQueryData<GetQuotationsRes>([
      queryKey.getQuotations,
    ])

    const quotations = quotationsRes?.quotations

    if (quotations) {
      const quotationsWithSameFile = quotations.filter((quotation) => {
        const filesInQuotation = quotation.files ?? []

        const hasSameFile = filesInQuotation.some(
          (file) => file.fileName === fileName,
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

    deleteFile({ fileName })
  }, [])

  return {
    onDeleteClick,
    isPending,
    isSuccess,
  }
}
