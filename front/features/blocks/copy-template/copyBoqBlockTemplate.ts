import { clipboardSlice } from '@front/entities/quotation/redux/clipboardSlice'

// assets can be imported as strings using the ?raw suffix
import boqBlockPreviewHtml from '@front/entities/quotation/templates/boqBlockPreview.html?raw'
import boqHeaderDescriptionHtml from '@front/entities/quotation/templates/boqHeaderDescription.html?raw'
import boqHeaderItemPriceHtml from '@front/entities/quotation/templates/boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from '@front/entities/quotation/templates/boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from '@front/entities/quotation/templates/boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from '@front/entities/quotation/templates/boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from '@front/entities/quotation/templates/boqSubtotalText.html?raw'
import boqTitleHtml from '@front/entities/quotation/templates/boqTitle.html?raw'
import rowOneDescriptionHtml from '@front/entities/quotation/templates/rowOneDescription.html?raw'
import rowOneItemPriceHtml from '@front/entities/quotation/templates/rowOneItemPrice.html?raw'
import rowOnePriceHtml from '@front/entities/quotation/templates/rowOnePrice.html?raw'
import rowOneQtyHtml from '@front/entities/quotation/templates/rowOneQty.html?raw'
import rowThreeDescriptionHtml from '@front/entities/quotation/templates/rowThreeDescription.html?raw'
import rowThreeItemPriceHtml from '@front/entities/quotation/templates/rowThreeItemPrice.html?raw'
import rowThreePriceHtml from '@front/entities/quotation/templates/rowThreePrice.html?raw'
import rowThreeQtyHtml from '@front/entities/quotation/templates/rowThreeQty.html?raw'
import rowTwoDescriptionHtml from '@front/entities/quotation/templates/rowTwoDescription.html?raw'
import rowTwoItemPriceHtml from '@front/entities/quotation/templates/rowTwoItemPrice.html?raw'
import rowTwoPriceHtml from '@front/entities/quotation/templates/rowTwoPrice.html?raw'
import rowTwoQtyHtml from '@front/entities/quotation/templates/rowTwoQty.html?raw'
import type { BoqBlock } from '@back/entity/quotation/schema'
import { generateId } from '@front/shared/lib/nanoid/generateId'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const copyBoqBlockTemplate = (event?: React.MouseEvent): void => {
  const boqBlockTemplate: BoqBlock = {
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

  reduxHolder.dispatch(
    clipboardSlice.actions.addItem({
      item: boqBlockTemplate,
      preview: boqBlockPreviewHtml,
    }),
  )

  const isClipboardModalVisible = reduxHolder.getState().clipboard.isVisible

  if (isClipboardModalVisible === false && event !== undefined) {
    reduxHolder.dispatch(
      clipboardSlice.actions.setInitCursorPos({
        x: event.clientX,
        y: event.clientY,
      }),
    )

    reduxHolder.dispatch(clipboardSlice.actions.showClipboardModal())
  }
}
