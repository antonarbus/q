import { nanoid } from 'nanoid'
import { TItems } from './types'

export const defaultItems: TItems = [
  {
    id: nanoid(3),
    type: 'text',
    width: 800,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
      froalaHeight: 0,
    },
  },
  {
    id: nanoid(3),
    type: 'boq',
    width: 700,
    height: 347,
    msg: '',
    boq: {
      header: {
        title: {
          html: '<b>Title</b>',
          froalaHeight: 0,
        },
        subtotal: {
          text: {
            html: '<div>Subtotal</div>',
            froalaHeight: 0,
          },
          price: {
            value: 666,
            html: '<b>666</b>',
            froalaHeight: 0,
          },
          currency: {
            html: '<div>EUR</div>',
            froalaHeight: 0,
          }
        }
      },
      column: {
        description: {
          html: '<b>Description</b>',
          froalaHeight: 0,
        },
        item: {
          html: '<b>Item</b>',
          froalaHeight: 0,
        },
        qty: {
          html: '<b>Qty</b>',
          froalaHeight: 0,
        },
        price: {
          html: '<b>Price</b>',
          froalaHeight: 0,
        }
      },
      rows: [
        {
          description: {
            html: 'description 1',
            froalaHeight: 0,
          },
          item: {
            html: '500',
            froalaHeight: 0,
            value: 500,
          },
          qty: {
            html: '1',
            froalaHeight: 0,
            value: 1,
          },
          price: {
            html: '500',
            froalaHeight: 0,
            value: 500,
          },
        },
        {
          description: {
            html: 'description 2',
            froalaHeight: 0,
          },
          item: {
            html: '500',
            froalaHeight: 0,
            value: 500,
          },
          qty: {
            html: '2',
            froalaHeight: 0,
            value: 2,
          },
          price: {
            html: '1000',
            froalaHeight: 0,
            value: 1000,
          },
        },
        {
          description: {
            html: 'description 3',
            froalaHeight: 0,
          },
          item: {
            html: '500',
            froalaHeight: 0,
            value: 500,
          },
          qty: {
            html: '3',
            froalaHeight: 0,
            value: 3,
          },
          price: {
            html: '1500',
            froalaHeight: 0,
            value: 1500,
          },
        },
      ]
    }
  },
  {
    id: nanoid(3),
    type: 'text',
    width: 600,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
      froalaHeight: 0,
    },
  },
  {
    id: nanoid(3),
    type: 'text',
    width: 500,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
      froalaHeight: 0,
    },
  }
]
