import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'

type FilterModel = {
  email?: {
    filter: string
    filterType: string
    type: string
  }
}

export const EmailCellRenderer = (
  params: ICellRendererParams<QuotationPick, string>,
): React.ReactNode => {
  const filterModel = params.api.getFilterModel() as FilterModel
  const filterValue = filterModel.email?.filter ?? ''

  const text = getTextWithBoldSubStringAsJsx({
    text: params.value ?? '',
    subString: filterValue,
  })

  return <div>{text}</div>
}
