import { useGetBookmarkCategoryListQuery } from '@front/entities/bookmark/api/useGetBookmarkCategoryListQuery'
import { useGetQuotationCategoryListQuery } from '@front/entities/quotation/api/useGetQuotationCategoryListQuery'
import { useParams } from 'react-router-dom'

type Res = string[]

export const useDistinctCategories = (): Res => {
  const urlParams = useParams()
  const getQuotationCategoryListQuery = useGetQuotationCategoryListQuery()
  const getBookmarkCategoryListQuery = useGetBookmarkCategoryListQuery()

  const quotationCategories =
    getQuotationCategoryListQuery.data?.distinctQuotationCategoryList ?? []

  const bookmarkCategories = getBookmarkCategoryListQuery.data?.distinctCategoryList ?? []

  const distinctCategories =
    urlParams.bookmarkId === undefined ? quotationCategories : bookmarkCategories

  return distinctCategories
}
