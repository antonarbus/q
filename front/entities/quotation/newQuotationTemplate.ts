import boqHeaderDescriptionHtml from '@features/blocks/insert/templates/boqHeaderDescription.html?raw'
import boqHeaderItemPriceHtml from '@features/blocks/insert/templates/boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from '@features/blocks/insert/templates/boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from '@features/blocks/insert/templates/boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from '@features/blocks/insert/templates/boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from '@features/blocks/insert/templates/boqSubtotalText.html?raw'
import boqTitleHtml from '@features/blocks/insert/templates/boqTitle.html?raw'
import rowItemHtml from '@features/blocks/insert/templates/rowItem.html?raw'
import rowItemPriceHtml from '@features/blocks/insert/templates/rowItemPrice.html?raw'
import rowQtyHtml from '@features/blocks/insert/templates/rowQty.html?raw'
import { generateId } from '@shared/lib/nanoid'
import { itemType } from './const/itemType'
import { rowTypeKey } from './const/rowTypeKey'
import termsAndConditionsHtml from './templates/termsAndConditions.html?raw'
import totalPriceTitleHtml from './templates/totalPriceTitle.html?raw'
import totalPriceValueHtml from './templates/totalPriceValue.html?raw'
import welcomeTextHtml from './templates/welcomeText.html?raw'
import type { Quotation } from './type'

export const newQuotationTemplate: Quotation = {
  id: 'new',
  type: 'quotation',
  email: 'john@mail.com',
  permissionLevel: undefined,
  access: {
    level: 'nobody',
    userList: [],
  },
  preview: '',
  blocks: [
    {
      id: generateId(),
      type: itemType.text,
      email: 'john@mail.com',
      width: 600,
      height: 0,
      isFroala: true,
      text: {
        html: welcomeTextHtml,
        value: null,
      },
    },
    {
      id: generateId(),
      type: itemType.boq,
      email: 'john@mail.com',
      width: 600,
      height: 0,
      isFroala: true,
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
    },
    {
      id: generateId(),
      type: itemType.price,
      email: 'john@mail.com',
      width: 150,
      height: 0,
      isFroala: true,
      title: {
        html: totalPriceTitleHtml,
        value: null,
      },
      price: {
        html: totalPriceValueHtml,
        value: 280,
      },
    },
    {
      id: generateId(),
      type: itemType.text,
      email: 'john@mail.com',
      width: 600,
      height: 0,
      isFroala: true,
      text: {
        html: termsAndConditionsHtml,
        value: null,
      },
    },
  ],
}
