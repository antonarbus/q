import { copySlice } from '@entities/copy/copySlice'
import { itemType } from '@entities/quotation/const/itemType'
import { rowTypeKey } from '@entities/quotation/const/rowTypeKey'
import type { Boq } from '@entities/quotation/type'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'
import boqBlockPreviewHtml from './templates/boqBlockPreview.html?raw' // assets can be imported as strings using the ?raw suffix
import boqHeaderDescriptionHtml from './templates/boqHeaderDescription.html?raw'
import boqHeaderItemPriceHtml from './templates/boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from './templates/boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from './templates/boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from './templates/boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from './templates/boqSubtotalText.html?raw'
import boqTitleHtml from './templates/boqTitle.html?raw'
import rowItemHtml from './templates/rowItem.html?raw'
import rowItemPriceHtml from './templates/rowItemPrice.html?raw'
import rowQtyHtml from './templates/rowQty.html?raw'

export const insertBoqBlock = (event?: MouseEvent): void => {
  const boqBlock: Boq = {
    id: generateId(),
    type: itemType.boq,
    email: 'john@mail.com',
    width: 600,
    height: 279,
    isFroala: true,
    preview: boqBlockPreviewHtml,
    boq: {
      header: {
        title: {
          html: boqTitleHtml,
          value: 0,
        },
        subtotalText: {
          html: boqSubtotalTextHtml,
          value: 0,
        },
        subTotalPrice: {
          html: boqSubtotalPriceHtml,
          value: 140,
        },
      },
      column: {
        number: {
          html: '',
          width: 30,
        },
        description: {
          html: boqHeaderDescriptionHtml,
          width: 240,
        },
        itemPrice: {
          html: boqHeaderItemPriceHtml,
          width: 100,
        },
        qty: {
          html: boqHeaderQtyHtml,
          width: 100,
        },
        price: {
          html: boqHeaderPriceHtml,
          width: 100,
        },
      },
      rows: [
        {
          id: generateId(),
          type: rowTypeKey.row,
          email: 'john@mail.com',
          height: 0,
          width: 0,
          description: {
            html: rowItemHtml,
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: rowItemPriceHtml,
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: rowQtyHtml,
            value: 1,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: rowItemPriceHtml,
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
        {
          id: generateId(),
          type: rowTypeKey.row,
          email: 'john@mail.com',
          height: 0,
          width: 0,
          description: {
            html: rowItemHtml,
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: rowItemPriceHtml,
            value: 20,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: rowQtyHtml,
            value: 2,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: rowItemPriceHtml,
            value: 40,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
        {
          id: generateId(),
          type: rowTypeKey.row,
          email: 'john@mail.com',
          height: 0,
          width: 0,
          description: {
            html: rowItemHtml,
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: rowItemPriceHtml,
            value: 30,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: rowQtyHtml,
            value: 3,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: rowItemPriceHtml,
            value: 90,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
      ],
    },
  }

  // Save scroll position before setNotEditable
  const scrollX = window.scrollX
  const scrollY = window.scrollY

  dispatch(textSlice.actions.setNotEditable())

  dispatch(copySlice.actions.addItem({ item: boqBlock }))

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(scrollX, scrollY)
  })

  const isCopyModalVisible = getState().copy.isVisible

  if (isCopyModalVisible === false && event !== undefined) {
    dispatch(
      copySlice.actions.showCopyModal({
        initCursorPos: { x: event.clientX, y: event.clientY },
      }),
    )
  }
}
