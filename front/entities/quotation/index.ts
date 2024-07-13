export { newQuotationTemplate } from './newQuotationTemplate'

// Signals
export { isFroalaSignal } from './signals/isFroalaSignal'
export { backgroundMessageSignal } from './signals/backgroundMessageSignal'

// Ref

export { previousQuotationRef } from './refs/previousQuotationRef'

// Api
export { useGetQuotationMutation } from './api/useGetQuotationMutation'
export { useGetQuotationsQuery } from './api/useGetQuotationsQuery'
export { useDeleteQuotationMutation } from './api/useDeleteQuotationMutation'
export { useSaveQuotationMutation } from './api/useSaveQuotationMutation'
export { useGetQuotationCategoriesQuery } from './api/useGetQuotationCategoriesQuery'

// CacheUpdaters
export { updateOrAppendIntoQuotationsCache } from './cacheUpdaters/updateOrAppendIntoQuotationsCache'
export { deleteFromQuotationsCache } from './cacheUpdaters/deleteFromQuotationsCache'
export { deleteQuotationsCache } from './cacheUpdaters/deleteQuotationsCache'

// Slice
export { quotationSlice } from './redux/quotationSlice'

// Selectors
export { itemsShapeEqualityFn } from './redux/selectors/itemsShapeEqualityFn'
export { selectIsLastBlock } from './redux/selectors/selectIsLastBlock'
export { selectIsLastBoqRow } from './redux/selectors/selectIsLastBoqRow'
export { selectColumnWidth } from './redux/selectors/selectColumnWidth'
export {
  selectBoqRows,
  boqRowsShapeEqualityFn,
} from './redux/selectors/selectBoqRows'
export { selectBoqCell } from './redux/selectors/selectBoqCell'
export { selectBoqCellPin } from './redux/selectors/selectBoqCellPin'

// Utils
export { saveBlockHeightByIndex } from './utils/saveBlockHeightByIndex'
export { didBoqCellContentChange } from './utils/didBoqCellContentChange'
export { didBoqHeaderCellContentChange } from './utils/didBoqHeaderCellContentChange'
export { isBoqRowPriceValid } from './utils/isBoqRowPriceValid'
export { updateBoqRowCellWithValue } from './utils/updateBoqRowCellWithValue'
export { updateSubTotalPriceWithValue } from './utils/updateSubTotalPriceWithValue'
export { formatBoqRowCellNumber } from './utils/formatBoqRowCellNumber'
export { getNumberOfBoqBlocksAbove } from './utils/getNumberOfBoqBlocksAbove'
export { getTotalPriceAbove } from './utils/getTotalPriceAbove'
export { fixImagesHeight, unfixImagesHeight } from './utils/imagesHeight'

// Store item getters
export { getBlockFromStore } from './redux/getters/getBlockFromStore'
export { getBoqRowFromStore } from './redux/getters/getBoqRowFromStore'
export { getBoqRowsFromStore } from './redux/getters/getBoqRowsFromStore'
export { getBoqBlockFromStore } from './redux/getters/getBoqBlockFromStore'
export { getBoqCellFromStore } from './redux/getters/getBoqCellFromStore'
export { getBoqHeaderFromStore } from './redux/getters/getBoqHeaderFromStore'
export { getBoqColumnFromStore } from './redux/getters/getBoqColumnFromStore'
export { getItemByIdFromStore } from './redux/getters/getItemByIdFromStore'

// Store html getters
export { getTextBlockHtmlFromStore } from './redux/getters/getTextBlockHtmlFromStore'
export { getBoqColumnHtmlFromStore } from './redux/getters/getBoqColumnHtmlFromStore'
export { getBoqHeaderHtmlFromStore } from './redux/getters/getBoqHeaderHtmlFromStore'
export { getBoqCellHtmlFromStore } from './redux/getters/getBoqCellHtmlFromStore'
export { getPriceBlockHtmlFromStore } from './redux/getters/getPriceBlockHtmlFromStore'

// Store cell updaters (html + value)
export { updateBoqColumnCellAtStore } from './redux/updaters/updateBoqColumnCellAtStore'
export { updateBoqHeaderCellAtStore } from './redux/updaters/updateBoqHeaderCellAtStore'
export { updateBoqRowCellAtStore } from './redux/updaters/updateBoqRowCellAtStore'

// Ui
export { BlockComp } from './ui/BlockComp'
export { Froala } from './ui/froala/Froala'
export { BackgroundMessage } from './ui/BackgroundMessage'

// Styles
export { textItemCellStyle } from './styles/textItemCellStyle'
export { boqRowCellStyle, boqRowCellSx } from './styles/boqRowCellStyle'
export { columnHeaderStyle } from './styles/columnHeaderStyle'
export { subTotalPriceCellStyle } from './styles/subTotalPriceCellStyle'
export { subTotalTextCellStyle } from './styles/subTotalTextCellStyle'
export { titleCellStyle } from './styles/titleCellStyle'

// Hooks
export { useIsBlockSortDisabled } from './hooks/useIsBlockSortDisabled'
export { useIsBoqRowSortDisabled } from './hooks/useIsBoqRowSortDisabled'
export { useStylesForResizableCell } from './hooks/useStylesForResizableCell'

// Providers
export {
  BoqItemProvider,
  useBoqItem,
  type BoqItemContextType,
} from './providers/BoqItemProvider'
export { ItemProvider, useItem } from './providers/ItemProvider'
export { RowProvider, useRow } from './providers/RowProvider'
export { FroalaProvider, useFroala } from './providers/FroalaProvider'

// Consts
export { itemKey } from './consts/itemKey'
export { boqRowKey } from './consts/boqRowKey'
export { boqColumnKey } from './consts/boqColumnKey'
export { boqRowCellKey } from './consts/boqRowCellKey'

// Types
export type {
  BoqHeaderCell,
  BoqHeaderKey,
  BoqColumnKey,
  BoqRowCellKey,
  BoqRow,
  BoqRowCellPin,
  BoqRowCell,
  BoqRowEditorRefs,
  BoqBlock,
  Block,
  BoqCols,
  Item,
  Quotation,
} from './types'
