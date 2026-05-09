import { generateId } from '@front/shared/lib/nanoid/generateId'

// assets can be imported as strings using the ?raw suffix
import boqHeaderDescriptionHtml from './boqHeaderDescription.html?raw'
import boqHeaderItemPriceHtml from './boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from './boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from './boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from './boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from './boqSubtotalText.html?raw'
import boqTitleHtml from './boqTitle.html?raw'
import rowOneDescriptionHtml from './rowOneDescription.html?raw'
import rowOneItemPriceHtml from './rowOneItemPrice.html?raw'
import rowOnePriceHtml from './rowOnePrice.html?raw'
import rowOneQtyHtml from './rowOneQty.html?raw'
import rowThreeDescriptionHtml from './rowThreeDescription.html?raw'
import rowThreeItemPriceHtml from './rowThreeItemPrice.html?raw'
import rowThreePriceHtml from './rowThreePrice.html?raw'
import rowThreeQtyHtml from './rowThreeQty.html?raw'
import rowTwoDescriptionHtml from './rowTwoDescription.html?raw'
import rowTwoItemPriceHtml from './rowTwoItemPrice.html?raw'
import rowTwoPriceHtml from './rowTwoPrice.html?raw'
import rowTwoQtyHtml from './rowTwoQty.html?raw'
import termsAndConditionsHtml from './termsAndConditions.html?raw'
import totalPriceTitleHtml from './totalPriceTitle.html?raw'
import totalPriceValueHtml from './totalPriceValue.html?raw'
import welcomeTextHtml from './welcomeText.html?raw'
import paymentHeadingHtml from './paymentHeading.html?raw'
import payButtonLabelHtml from './payButtonLabel.html?raw'
import type { Quotation } from '@back/entity/quotation/schema'

export const newQuotationTemplate: Quotation = {
  id: 'new',
  quotationSchemaVersion: 2,
  type: 'quotation',
  name: '',
  category: '',
  desc: '',
  info: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  openedAt: null,
  viewedAt: null,
  email: 'unknown@gmail.com',
  permissionLevel: 'NEW',
  access: {
    level: 'nobody',
    userList: [],
  },
  paidAt: null,
  blocks: [
    {
      id: generateId(),
      bookmarkSchemaVersion: 2,
      name: '',
      category: '',
      desc: '',
      info: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: 'text',
      email: 'unknown@gmail.com',
      width: 600,
      height: 0,

      text: {
        html: welcomeTextHtml,
        value: null,
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
      type: 'boq',
      email: 'unknown@gmail.com',
      width: 600,
      height: 0,

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
      type: 'price',
      email: 'unknown@gmail.com',
      width: 150,
      height: 0,

      title: {
        html: totalPriceTitleHtml,
        value: null,
      },
      price: {
        html: totalPriceValueHtml,
        value: 140,
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
      type: 'payment',
      email: 'unknown@gmail.com',
      width: 400,
      height: 200,
      payment: {
        amount: 0,
        currency: 'usd',
        heading: {
          html: paymentHeadingHtml,
        },
        payButtonLabel: {
          html: payButtonLabelHtml,
        },
        stripePaymentLinkId: null,
        stripePaymentLinkUrl: null,
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
      type: 'text',
      email: 'unknown@gmail.com',
      width: 600,
      height: 0,
      text: {
        html: termsAndConditionsHtml,
        value: null,
      },
    },
  ],
}
