import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'

type FilterModel = {
  category?: {
    filter: string
    filterType: string
    type: string
  }
}

export const CategoryCellRenderer = (
  params: ICellRendererParams<QuotationPick, string>,
): React.ReactNode => {
  const filterModel = params.api.getFilterModel() as FilterModel
  const filterValue = filterModel.category?.filter ?? ''

  const text = getTextWithBoldSubStringAsJsx({
    text: params.value ?? '',
    subString: filterValue,
  })

  return <div>{text}</div>
}
