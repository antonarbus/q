import type { Item } from 'client/shared/types'
import { nanoid } from 'nanoid'

export const defaultItems: Item[] = [
  {
    id: nanoid(3),
    type: 'text',
    width: 800,
    height: 0,
    msg: '',
    text: {
      html: '<div>editable text</div>',
    },
  },
  {
    id: nanoid(3),
    type: 'boq',
    width: 700,
    height: 0,
    msg: '',
    boq: {
      header: {
        title: {
          html: '<b>Title</b>',
          isFroala: true,
        },
        subtotal: {
          html: '<div>Subtotal</div>',
          isFroala: true,
        },
        price: {
          value: 666,
          html: '<b>666</b>',
          isFroala: true,
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
        item: {
          html: '<b>Item</b>',
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
            isFroala: true,
          },
          description: {
            html: 'description 1',
            isFroala: true,
          },
          item: {
            html: '500',
            value: 500,
            isFroala: true,
          },
          qty: {
            html: '1',
            value: 1,
            isFroala: true,
          },
          price: {
            html: '500',
            value: 500,
            isFroala: true,
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
            isFroala: true,
          },
          description: {
            html: 'description 2',
            isFroala: true,
          },
          item: {
            html: '500',
            value: 500,
            isFroala: true,
          },
          qty: {
            html: '2',
            value: 2,
            isFroala: true,
          },
          price: {
            html: '1000',
            value: 1000,
            isFroala: true,
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
            isFroala: true,
          },
          description: {
            html: 'description 3',
            isFroala: true,
          },
          item: {
            html: '500',
            value: 500,
            isFroala: true,
          },
          qty: {
            html: '3',
            value: 3,
            isFroala: true,
          },
          price: {
            html: '1500',
            value: 1500,
            isFroala: true,
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
    text: {
      html: '<div>editable text</div>',
    },
  },
  {
    id: nanoid(3),
    type: 'text',
    width: 500,
    height: 0,
    msg: '',
    text: {
      html: '<div>editable text</div>',
    },
  },
]
