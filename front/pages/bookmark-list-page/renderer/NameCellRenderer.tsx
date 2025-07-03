import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'

type FilterModel = {
  name?: {
    filter: string
    filterType: string
    type: string
  }
}

export const NameCellRenderer = (
  params: ICellRendererParams<QuotationPick, string>,
): React.ReactNode => {
  const filterModel = params.api.getFilterModel() as FilterModel
  const filterValue = filterModel.name?.filter ?? ''

  const text = getTextWithBoldSubStringAsJsx({
    text: params.value ?? '',
    subString: filterValue,
  })

  return <div>{text}</div>
}
