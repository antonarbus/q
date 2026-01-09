import { useGetBookmarkCategoryListQuery } from '@entity/bookmark/api/useGetBookmarkCategoryListQuery'
import { useGetQuotationCategoryListQuery } from '@entity/quotation/api/useGetQuotationCategoryListQuery'
import { useParams } from 'react-router-dom'

type Res = string[]

export const useDistinctCategories = (): Res => {
  const urlParams = useParams()
  const getQuotationCategoryListQuery = useGetQuotationCategoryListQuery()
  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()

  const quotationCategories =
    getQuotationCategoryListQuery.data?.distinctQuotationList ?? []

  const bookmarkCategories =
    getBookmarkCategoryListQuery.data?.distinctCategoryList ?? []

  const distinctCategories =
    urlParams.bookmarkId === undefined
      ? quotationCategories
      : bookmarkCategories

  return distinctCategories
}
