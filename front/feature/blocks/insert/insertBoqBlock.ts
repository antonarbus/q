import { copySlice } from '@entity/copy/copySlice'
import boqBlockPreviewHtml from '@entity/quotation/templates/boqBlockPreview.html?raw' // assets can be imported as strings using the ?raw suffix
import boqHeaderDescriptionHtml from '@entity/quotation/templates/boqHeaderDescription.html?raw'
import boqHeaderItemPriceHtml from '@entity/quotation/templates/boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from '@entity/quotation/templates/boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from '@entity/quotation/templates/boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from '@entity/quotation/templates/boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from '@entity/quotation/templates/boqSubtotalText.html?raw'
import boqTitleHtml from '@entity/quotation/templates/boqTitle.html?raw'
import rowOneDescriptionHtml from '@entity/quotation/templates/rowOneDescription.html?raw'
import rowOneItemPriceHtml from '@entity/quotation/templates/rowOneItemPrice.html?raw'
import rowOnePriceHtml from '@entity/quotation/templates/rowOnePrice.html?raw'
import rowOneQtyHtml from '@entity/quotation/templates/rowOneQty.html?raw'
import rowThreeDescriptionHtml from '@entity/quotation/templates/rowThreeDescription.html?raw'
import rowThreeItemPriceHtml from '@entity/quotation/templates/rowThreeItemPrice.html?raw'
import rowThreePriceHtml from '@entity/quotation/templates/rowThreePrice.html?raw'
import rowThreeQtyHtml from '@entity/quotation/templates/rowThreeQty.html?raw'
import rowTwoDescriptionHtml from '@entity/quotation/templates/rowTwoDescription.html?raw'
import rowTwoItemPriceHtml from '@entity/quotation/templates/rowTwoItemPrice.html?raw'
import rowTwoPriceHtml from '@entity/quotation/templates/rowTwoPrice.html?raw'
import rowTwoQtyHtml from '@entity/quotation/templates/rowTwoQty.html?raw'
import type { BoqBlock } from '@back/entity/quotation/schema'
import { textSlice } from '@shared/lib/froala/textSlice'
import { generateId } from '@front/shared/lib/nanoid'
import { dispatch, getState } from '@shared/lib/redux'
import type { MouseEvent } from 'react'

export const insertBoqBlock = (event?: MouseEvent): void => {
  const boqBlock: BoqBlock = {
    id: generateId(),
    bookmarkSchemaVersion: 2,
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: 'boq',
    email: 'unknown@gmail.com',
    width: 600,
    height: 279,
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
          bookmarkSchemaVersion: 2,
          name: '',
          category: '',
          desc: '',
          info: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: 'row',
          email: 'unknown@gmail.com',
          height: 0,
          width: 0,
          preview: '',
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
          bookmarkSchemaVersion: 2,
          name: '',
          category: '',
          desc: '',
          info: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: 'row',
          email: 'unknown@gmail.com',
          height: 0,
          width: 0,
          preview: '',
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
          bookmarkSchemaVersion: 2,
          name: '',
          category: '',
          desc: '',
          info: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: 'row',
          email: 'unknown@gmail.com',
          height: 0,
          width: 0,
          preview: '',
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

  const persistedScrollX = window.scrollX
  const persistedScrollY = window.scrollY

  dispatch(textSlice.actions.setNotEditable())
  dispatch(copySlice.actions.addItem({ item: boqBlock }))

  // Restore scroll position after React renders
  requestAnimationFrame(() => {
    window.scrollTo(persistedScrollX, persistedScrollY)
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
