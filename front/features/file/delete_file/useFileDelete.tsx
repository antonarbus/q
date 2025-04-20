import { useDeleteFileMutation } from '@entities/quotation'
import { instance } from '@shared/instance'
import type { ResBody as GetQuotationsRes } from '@back/api/quotation/getQuotationsHandler'
import { queryKey } from '@shared/consts/queryKey'
import { useCallback } from 'react'
import type { FileInfo } from '@entities/quotation/types'
import { useUpdateEffect } from 'react-use'
import { produce } from 'immer'

type Props = {
  fileInfo: FileInfo
}

type Res = {
  onDeleteClick: (e: Event) => void
  isSuccess: boolean
  isPending: boolean
}

export const useFileDelete = ({ fileInfo }: Props): Res => {
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

  const onDeleteClick = useCallback((e: Event): void => {
    e.preventDefault()

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
  }, [])

  return {
    onDeleteClick,
    isPending,
    isSuccess,
  }
}
