import { closeSuggestModal } from '@front/features/blocks/close-suggest-modal/closeSuggestModal'
import { updateCellAtStore } from '@front/entities/quotation/redux/updater/updateCellAtStore'
import { updateItemPriceCellAtBoqBlock } from '@front/features/blocks/update-item-price-cell-at-boq-block/updateItemPriceCellAtBoqBlock'
import { recalculateSubTotalPrices } from '@front/entities/quotation/util/recalculateSubTotalPrices'
import { recalculateTotalPrices } from '@front/entities/quotation/util/recalculateTotalPrices'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { getRowFromStoreByIndex } from '@front/entities/quotation/redux/getter/getRowFromStoreByIndex'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { editorRegistry, getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { roundTo } from 'round-to'
import type { ResBody, ReqBody } from '@back/api/ai/suggestProductHandler'

type Props = {
  blockIndex: number
  rowIndex: number
  userPrompt: string
  mutateAsync: (payload: ReqBody) => Promise<ResBody>
}

export const suggestProduct = async (props: Props): Promise<void> => {
  const { blockIndex, rowIndex, userPrompt, mutateAsync } = props

  closeSuggestModal()

  const descriptionEditor =
    editorRegistry.get(
      getRegistryKey({ editorName: 'boqBlockDescriptionCell', blockIndex, rowIndex }),
    ) ?? null

  if (descriptionEditor === null) {
    return
  }

  descriptionEditor.commands.setContent('<p>Searching.</p>', { emitUpdate: false })

  let dotCount = 1

  const interval = setInterval(() => {
    dotCount = dotCount === 3 ? 1 : dotCount + 1

    descriptionEditor.commands.setContent(`<p>Searching${'.'.repeat(dotCount)}</p>`, {
      emitUpdate: false,
    })
  }, 300)

  try {
    const { description, itemPrice, supplierNotes } = await mutateAsync({ userPrompt })

    clearInterval(interval)

    const descriptionHtml = `<p>${description}</p>`
    descriptionEditor.commands.setContent(descriptionHtml, { emitUpdate: false })
    updateCellAtStore({ blockIndex, rowIndex, cellKey: 'description', html: descriptionHtml })

    const getCurrencyFromState = (): string => {
      const { blocks } = reduxHolder.getState().quotation
      const paymentBlock = blocks.find((block) => block.type === 'payment')

      return paymentBlock?.type === 'payment' ? paymentBlock.payment.currency.toUpperCase() : '$'
    }

    const currency = getCurrencyFromState()
    const markedUpPrice = roundTo(itemPrice * 1.3, 2)

    const itemPriceEditor =
      editorRegistry.get(
        getRegistryKey({ editorName: 'boqBlockItemPriceCell', blockIndex, rowIndex }),
      ) ?? null

    if (itemPriceEditor !== null) {
      itemPriceEditor.commands.setContent(`<p>${markedUpPrice} ${currency}</p>`, {
        emitUpdate: false,
      })

      updateItemPriceCellAtBoqBlock({ blockIndex, rowIndex })
      recalculateSubTotalPrices({ incrementally: true })
      recalculateTotalPrices()
    }

    const row = getRowFromStoreByIndex({ blockIndex, rowIndex })

    if (row !== undefined) {
      reduxHolder.dispatch(
        quotationSlice.actions.updateItemInfo({
          id: row.id,
          name: row.name,
          category: row.category,
          desc: row.desc,
          info: supplierNotes,
        }),
      )
    }
  } catch {
    clearInterval(interval)
    descriptionEditor.commands.setContent('<p></p>', { emitUpdate: false })
  }
}
