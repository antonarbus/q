import { copySlice } from '@entities/copy/copySlice'
import { itemType } from '@entities/quotation/const/itemType'
import { rowTypeKey } from '@entities/quotation/const/rowTypeKey'
import boqBlockPreviewHtml from '@entities/quotation/templates/boqBlockPreview.html?raw' // assets can be imported as strings using the ?raw suffix
import boqHeaderDescriptionHtml from '@entities/quotation/templates/boqHeaderDescription.html?raw'
import boqHeaderItemPriceHtml from '@entities/quotation/templates/boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from '@entities/quotation/templates/boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from '@entities/quotation/templates/boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from '@entities/quotation/templates/boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from '@entities/quotation/templates/boqSubtotalText.html?raw'
import boqTitleHtml from '@entities/quotation/templates/boqTitle.html?raw'
import rowOneDescriptionHtml from '@entities/quotation/templates/rowOneDescription.html?raw'
import rowOneItemPriceHtml from '@entities/quotation/templates/rowOneItemPrice.html?raw'
import rowOnePriceHtml from '@entities/quotation/templates/rowOnePrice.html?raw'
import rowOneQtyHtml from '@entities/quotation/templates/rowOneQty.html?raw'
import rowThreeDescriptionHtml from '@entities/quotation/templates/rowThreeDescription.html?raw'
import rowThreeItemPriceHtml from '@entities/quotation/templates/rowThreeItemPrice.html?raw'
import rowThreePriceHtml from '@entities/quotation/templates/rowThreePrice.html?raw'
import rowThreeQtyHtml from '@entities/quotation/templates/rowThreeQty.html?raw'
import rowTwoDescriptionHtml from '@entities/quotation/templates/rowTwoDescription.html?raw'
import rowTwoItemPriceHtml from '@entities/quotation/templates/rowTwoItemPrice.html?raw'
import rowTwoPriceHtml from '@entities/quotation/templates/rowTwoPrice.html?raw'
import rowTwoQtyHtml from '@entities/quotation/templates/rowTwoQty.html?raw'
import type { Boq } from '@entities/quotation/types/BlockItem'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertBoqBlock = (event?: MouseEvent): void => {
  const boqBlock: Boq = {
    id: generateId(),
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: itemType.boq,
    email: 'unknown@gmail.com',
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
          name: '',
          category: '',
          desc: '',
          info: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: rowTypeKey.row,
          email: 'unknown@gmail.com',
          height: 0,
          width: 0,
          description: {
            html: rowOneDescriptionHtml,
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: rowOneItemPriceHtml,
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: rowOneQtyHtml,
            value: 1,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: rowOnePriceHtml,
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
        {
          id: generateId(),
          name: '',
          category: '',
          desc: '',
          info: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: rowTypeKey.row,
          email: 'unknown@gmail.com',
          height: 0,
          width: 0,
          description: {
            html: rowTwoDescriptionHtml,
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: rowTwoItemPriceHtml,
            value: 20,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: rowTwoQtyHtml,
            value: 2,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: rowTwoPriceHtml,
            value: 40,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
        {
          id: generateId(),
          name: '',
          category: '',
          desc: '',
          info: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: rowTypeKey.row,
          email: 'unknown@gmail.com',
          height: 0,
          width: 0,
          description: {
            html: rowThreeDescriptionHtml,
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: rowThreeItemPriceHtml,
            value: 30,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: rowThreeQtyHtml,
            value: 3,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: rowThreePriceHtml,
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
  const { scrollX, scrollY } = window

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
