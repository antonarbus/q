import { reactQuery } from '@lib_instances/reactQuery'
import { IconButton } from '@mui/material'
import { type ResBody } from '@server/api/getQuotationsRouter'
import { produce } from 'immer'
import { useEffect, type ReactNode } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useDeleteQuotationMutation } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { queryKey } from '@shared/consts/queryKey'

type Props = {
  id: string
}

export const DeleteQuotationButton = ({ id }: Props): ReactNode => {
  const { mutate, isPending, isSuccess } = useDeleteQuotationMutation()

  useEffect(() => {
    if (!isSuccess) return

    reactQuery.setQueriesData<ResBody>(
      { queryKey: [queryKey.getQuotations] },
      (cacheData) => {
        const updatedCacheData = produce(cacheData, (draft) => {
          if (draft?.documents === undefined) return
          const quotations = draft.documents
          const index = quotations.findIndex(quotation => quotation.id === id)
          const foundInCache = index !== -1
          if (foundInCache) {
            quotations.splice(index, 1)
          }
        })
        return updatedCacheData
      })
  }, [isSuccess])

  return (
    <IconButton
      size='small'
      onClick={() => {
        mutate({ id })
      }}
    >
      {!isPending && <MdDeleteOutline />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
