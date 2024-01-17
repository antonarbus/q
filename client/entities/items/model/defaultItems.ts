import type { Item } from '@shared/types'
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
          value: 0,
        },
        subtotalText: {
          html: '<div>Subtotal</div>',
          value: 0,
        },
        subTotalPrice: {
          html: '<b>140</b>',
          value: 140,
        },
      },
      column: {
        number: {
          html: '<b>#</b>',
          width: 30,
        },
        description: {
          html: '<b>Description</b>',
          width: 200,
        },
        itemPrice: {
          html: '<b>Item price</b>',
          width: 100,
        },
        qty: {
          html: '<b>Qty</b>',
          width: 100,
        },
        price: {
          html: '<b>Price</b>',
          width: 100,
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
              isPinned: false,
              isShown: false,
            },
          },
          description: {
            html: 'description 1',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '10',
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '1',
            value: 1,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '10',
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
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
              isPinned: false,
              isShown: false,
            },
          },
          description: {
            html: 'description 2',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '20',
            value: 20,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '2',
            value: 2,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '40',
            value: 40,
            pin: {
              isPinned: false,
              isShown: false,
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
              isPinned: false,
              isShown: false,
            },
          },
          description: {
            html: 'description 3',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '30',
            value: 30,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '3',
            value: 3,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '90',
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
