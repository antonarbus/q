import { generateId } from '@front/shared/lib/nanoid/generateId'

import boqHeaderDescriptionHtml from './boqHeaderDescription.html?raw'
import boqHeaderItemPriceHtml from './boqHeaderItemPrice.html?raw'
import boqHeaderPriceHtml from './boqHeaderPrice.html?raw'
import boqHeaderQtyHtml from './boqHeaderQty.html?raw'
import boqSubtotalPriceHtml from './boqSubtotalPrice.html?raw'
import boqSubtotalTextHtml from './boqSubtotalText.html?raw'
import boqTitleHtml from './boqTitle.html?raw'
import boqTwoSubtotalPriceHtml from './boqTwoSubtotalPrice.html?raw'
import boqTwoTitleHtml from './boqTwoTitle.html?raw'
import rowFiveDescriptionHtml from './rowFiveDescription.html?raw'
import rowFiveItemPriceHtml from './rowFiveItemPrice.html?raw'
import rowFivePriceHtml from './rowFivePrice.html?raw'
import rowFiveQtyHtml from './rowFiveQty.html?raw'
import rowFourDescriptionHtml from './rowFourDescription.html?raw'
import rowFourItemPriceHtml from './rowFourItemPrice.html?raw'
import rowFourPriceHtml from './rowFourPrice.html?raw'
import rowFourQtyHtml from './rowFourQty.html?raw'
import rowOneDescriptionHtml from './rowOneDescription.html?raw'
import rowOneItemPriceHtml from './rowOneItemPrice.html?raw'
import rowOnePriceHtml from './rowOnePrice.html?raw'
import rowOneQtyHtml from './rowOneQty.html?raw'
import rowSixDescriptionHtml from './rowSixDescription.html?raw'
import rowSixItemPriceHtml from './rowSixItemPrice.html?raw'
import rowSixPriceHtml from './rowSixPrice.html?raw'
import rowSixQtyHtml from './rowSixQty.html?raw'
import rowThreeDescriptionHtml from './rowThreeDescription.html?raw'
import rowThreeItemPriceHtml from './rowThreeItemPrice.html?raw'
import rowThreePriceHtml from './rowThreePrice.html?raw'
import rowThreeQtyHtml from './rowThreeQty.html?raw'
import rowTwoDescriptionHtml from './rowTwoDescription.html?raw'
import rowTwoItemPriceHtml from './rowTwoItemPrice.html?raw'
import rowTwoPriceHtml from './rowTwoPrice.html?raw'
import rowTwoQtyHtml from './rowTwoQty.html?raw'
import totalPriceTitleHtml from './totalPriceTitle.html?raw'
import totalPriceValueHtml from './totalPriceValue.html?raw'
import welcomeTextHtml from './welcomeText.html?raw'
import paymentHeadingHtml from './paymentHeading.html?raw'
import payButtonLabelHtml from './payButtonLabel.html?raw'
import type { Quotation } from '@back/entity/quotation/schema'

const boqColumns = {
  number: { html: '', width: 30 },
  description: { html: boqHeaderDescriptionHtml, width: 300 },
  itemPrice: { html: boqHeaderItemPriceHtml, width: 100 },
  qty: { html: boqHeaderQtyHtml, width: 100 },
  price: { html: boqHeaderPriceHtml, width: 100 },
}

const rowDefaults = {
  bookmarkSchemaVersion: 2 as const,
  name: '',
  category: '',
  desc: '',
  info: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: 'row' as const,
  email: 'unknown@gmail.com',
  height: 0,
  width: 0,
}

const blockDefaults = {
  bookmarkSchemaVersion: 2 as const,
  name: '',
  category: '',
  desc: '',
  info: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  email: 'unknown@gmail.com',
}

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
  access: { level: 'nobody', userList: [] },
  paidAt: null,
  blocks: [
    {
      ...blockDefaults,
      id: generateId(),
      type: 'text',
      width: 660,
      height: 0,
      text: { html: welcomeTextHtml, value: null },
    },
    {
      ...blockDefaults,
      id: generateId(),
      type: 'boq',
      width: 0,
      height: 0,
      boq: {
        header: {
          title: { html: boqTitleHtml, value: 0 },
          subtotalText: { html: boqSubtotalTextHtml, value: 0 },
          subTotalPrice: { html: boqSubtotalPriceHtml, value: 300 },
        },
        column: boqColumns,
        rows: [
          {
            ...rowDefaults,
            id: generateId(),
            description: {
              html: rowOneDescriptionHtml,
              value: 0,
              pin: { isPinned: false, isShown: false },
            },
            itemPrice: {
              html: rowOneItemPriceHtml,
              value: 120,
              pin: { isPinned: false, isShown: false },
            },
            qty: { html: rowOneQtyHtml, value: 1, pin: { isPinned: true, isShown: false } },
            price: { html: rowOnePriceHtml, value: 120, pin: { isPinned: false, isShown: false } },
          },
          {
            ...rowDefaults,
            id: generateId(),
            description: {
              html: rowTwoDescriptionHtml,
              value: 0,
              pin: { isPinned: false, isShown: false },
            },
            itemPrice: {
              html: rowTwoItemPriceHtml,
              value: 18,
              pin: { isPinned: false, isShown: false },
            },
            qty: { html: rowTwoQtyHtml, value: 6, pin: { isPinned: true, isShown: false } },
            price: { html: rowTwoPriceHtml, value: 108, pin: { isPinned: false, isShown: false } },
          },
          {
            ...rowDefaults,
            id: generateId(),
            description: {
              html: rowThreeDescriptionHtml,
              value: 0,
              pin: { isPinned: false, isShown: false },
            },
            itemPrice: {
              html: rowThreeItemPriceHtml,
              value: 22,
              pin: { isPinned: false, isShown: false },
            },
            qty: { html: rowThreeQtyHtml, value: 2, pin: { isPinned: true, isShown: false } },
            price: { html: rowThreePriceHtml, value: 44, pin: { isPinned: false, isShown: false } },
          },
          {
            ...rowDefaults,
            id: generateId(),
            description: {
              html: rowFourDescriptionHtml,
              value: 0,
              pin: { isPinned: false, isShown: false },
            },
            itemPrice: {
              html: rowFourItemPriceHtml,
              value: 28,
              pin: { isPinned: false, isShown: false },
            },
            qty: { html: rowFourQtyHtml, value: 1, pin: { isPinned: true, isShown: false } },
            price: { html: rowFourPriceHtml, value: 28, pin: { isPinned: false, isShown: false } },
          },
        ],
      },
    },
    {
      ...blockDefaults,
      id: generateId(),
      type: 'boq',
      width: 0,
      height: 0,
      boq: {
        header: {
          title: { html: boqTwoTitleHtml, value: 0 },
          subtotalText: { html: boqSubtotalTextHtml, value: 0 },
          subTotalPrice: { html: boqTwoSubtotalPriceHtml, value: 350 },
        },
        column: boqColumns,
        rows: [
          {
            ...rowDefaults,
            id: generateId(),
            description: {
              html: rowFiveDescriptionHtml,
              value: 0,
              pin: { isPinned: false, isShown: false },
            },
            itemPrice: {
              html: rowFiveItemPriceHtml,
              value: 75,
              pin: { isPinned: false, isShown: false },
            },
            qty: { html: rowFiveQtyHtml, value: 4, pin: { isPinned: true, isShown: false } },
            price: { html: rowFivePriceHtml, value: 300, pin: { isPinned: false, isShown: false } },
          },
          {
            ...rowDefaults,
            id: generateId(),
            description: {
              html: rowSixDescriptionHtml,
              value: 0,
              pin: { isPinned: false, isShown: false },
            },
            itemPrice: {
              html: rowSixItemPriceHtml,
              value: 50,
              pin: { isPinned: false, isShown: false },
            },
            qty: { html: rowSixQtyHtml, value: 1, pin: { isPinned: true, isShown: false } },
            price: { html: rowSixPriceHtml, value: 50, pin: { isPinned: false, isShown: false } },
          },
        ],
      },
    },
    {
      ...blockDefaults,
      id: generateId(),
      type: 'price',
      width: 150,
      height: 0,
      title: { html: totalPriceTitleHtml, value: null },
      price: { html: totalPriceValueHtml, value: 650 },
    },
    {
      ...blockDefaults,
      id: generateId(),
      type: 'payment',
      width: 400,
      height: 200,
      payment: {
        amount: 65_000,
        currency: 'usd',
        heading: { html: paymentHeadingHtml },
        payButtonLabel: { html: payButtonLabelHtml },
        stripePaymentLinkId: null,
        stripePaymentLinkUrl: null,
      },
    },
  ],
}
