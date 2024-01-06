import type { Item } from 'client/shared/types'
import { nanoid } from 'nanoid'

export const defaultItems: Item[] = [
  {
    id: nanoid(3),
    type: 'text',
    width: 800,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: '<div>editable text</div>',
      value: null,
    },
  },
  {
    id: nanoid(3),
    type: 'boq',
    width: 700,
    height: 0,
    msg: '',
    isFroala: true,
    boq: {
      header: {
        title: {
          html: '<b>Title</b>',
          value: null,
        },
        subtotalText: {
          html: '<div>Subtotal</div>',
          value: null,
        },
        subTotalPrice: {
          html: '<b>140</b>',
          value: 140,
        },
      },
      column: {
        number: {
          html: '<b>#</b>',
          width: undefined,
        },
        description: {
          html: '<b>Description</b>',
          width: 350,
        },
        itemPrice: {
          html: '<b>Item price</b>',
          width: undefined,
        },
        qty: {
          html: '<b>Qty</b>',
          width: undefined,
        },
        price: {
          html: '<b>Price</b>',
          width: undefined,
        },
      },
      rows: [
        {
          id: nanoid(3),
          type: 'boq row',
          height: 0,
          width: 0,
          number: {
            html: '1',
            value: 1,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          description: {
            html: 'description 1',
            value: 0,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          itemPrice: {
            html: '10',
            value: 10,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          qty: {
            html: '1',
            value: 1,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          price: {
            html: '10',
            value: 10,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
        },
        {
          id: nanoid(3),
          type: 'boq row',
          height: 0,
          width: 0,
          number: {
            html: '2',
            value: 2,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          description: {
            html: 'description 2',
            value: 0,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          itemPrice: {
            html: '20',
            value: 20,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          qty: {
            html: '2',
            value: 2,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          price: {
            html: '40',
            value: 40,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
        },
        {
          id: nanoid(3),
          type: 'boq row',
          height: 0,
          width: 0,
          number: {
            html: '3',
            value: 3,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          description: {
            html: 'description 3',
            value: 0,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          itemPrice: {
            html: '30',
            value: 30,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          qty: {
            html: '3',
            value: 3,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
          price: {
            html: '90',
            value: 90,
            pin: {
              isActive: false,
              isDisplayed: false,
            },
          },
        },
      ],
    },
  },
  {
    id: nanoid(3),
    type: 'text',
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: '<div>editable text</div>',
      value: null,
    },
  },
  {
    id: nanoid(3),
    type: 'text',
    width: 500,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: '<div>editable text</div>',
      value: null,
    },
  },
]
