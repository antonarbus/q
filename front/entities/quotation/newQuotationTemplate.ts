import { generateId } from '@shared/lib/nanoid'
import { itemType } from './const/itemType'
import { rowTypeKey } from './const/rowTypeKey'
import { permissionLevel } from '@root/shared/const/permissionLevel'
import boqHeaderDescriptionHtml from './templates/boqHeaderDescription.html?raw' // assets can be imported as strings using the ?raw suffix
import boqHeaderItemPriceHtml from './templates/boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from './templates/boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from './templates/boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from './templates/boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from './templates/boqSubtotalText.html?raw'
import boqTitleHtml from './templates/boqTitle.html?raw'
import rowOneDescriptionHtml from './templates/rowOneDescription.html?raw'
import rowOneItemPriceHtml from './templates/rowOneItemPrice.html?raw'
import rowOnePriceHtml from './templates/rowOnePrice.html?raw'
import rowOneQtyHtml from './templates/rowOneQty.html?raw'
import rowThreeDescriptionHtml from './templates/rowThreeDescription.html?raw'
import rowThreeItemPriceHtml from './templates/rowThreeItemPrice.html?raw'
import rowThreePriceHtml from './templates/rowThreePrice.html?raw'
import rowThreeQtyHtml from './templates/rowThreeQty.html?raw'
import rowTwoDescriptionHtml from './templates/rowTwoDescription.html?raw'
import rowTwoItemPriceHtml from './templates/rowTwoItemPrice.html?raw'
import rowTwoPriceHtml from './templates/rowTwoPrice.html?raw'
import rowTwoQtyHtml from './templates/rowTwoQty.html?raw'
import termsAndConditionsHtml from './templates/termsAndConditions.html?raw'
import totalPriceTitleHtml from './templates/totalPriceTitle.html?raw'
import totalPriceValueHtml from './templates/totalPriceValue.html?raw'
import welcomeTextHtml from './templates/welcomeText.html?raw'
import type { Quotation } from './types/Quotation'

export const newQuotationTemplate: Quotation = {
  id: 'new',
  name: '',
  category: '',
  desc: '',
  info: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  openedAt: null,
  viewedAt: null,
  email: 'unknown@gmail.com',
  permissionLevel: permissionLevel.new,
  access: {
    level: 'nobody',
    userList: [],
  },
  blocks: [
    {
      id: generateId(),
      name: '',
      category: '',
      desc: '',
      info: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: itemType.text,
      email: 'unknown@gmail.com',
      width: 600,
      height: 0,
      preview: '',
      isFroala: true,
      text: {
        html: welcomeTextHtml,
        value: null,
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
      type: itemType.boq,
      email: 'unknown@gmail.com',
      width: 600,
      height: 0,
      preview: '',
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
            isFroala: true,
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
            isFroala: true,
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
            preview: '',
            isFroala: true,
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
    },
    {
      id: generateId(),
      name: '',
      category: '',
      desc: '',
      info: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: itemType.price,
      email: 'unknown@gmail.com',
      width: 150,
      height: 0,
      preview: '',
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
      name: '',
      category: '',
      desc: '',
      info: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: itemType.text,
      email: 'unknown@gmail.com',
      width: 600,
      height: 0,
      preview: '',
      isFroala: true,
      text: {
        html: termsAndConditionsHtml,
        value: null,
      },
    },
  ],
}
