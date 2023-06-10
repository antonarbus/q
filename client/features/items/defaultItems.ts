import { TItems } from './types'

export const defaultItems: TItems = [
  {
    id: 'id0',
    type: 'text',
    width: 800,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
    },
  },
  {
    id: 'id1',
    type: 'boq',
    width: 700,
    height: 347,
    msg: '',
    boq: {
      header: {
        title: {
          html: '<b>Title</b>',
        },
        subtotal: {
          text: {
            html: '<div>Subtotal</div>',
          },
          price: {
            value: 666,
            html: '<b>666</b>',
          },
          currency: {
            html: '<div>EUR</div>',
          }
        }
      },
      column: {
        description: {
          html: '<b>Description</b>',
        },
        item: {
          html: '<b>Item</b>',
        },
        qty: {
          html: '<b>Qty</b>',
        },
        price: {
          html: '<b>Price</b>',
        }
      },
      rows: [
        {
          description: {
            html: 'description 1'
          },
          item: {
            html: '500',
            value: 500
          },
          qty: {
            html: '1',
            value: 1
          },
          price: {
            html: '500',
            value: 500
          },
        },
        {
          description: {
            html: 'description 2'
          },
          item: {
            html: '500',
            value: 500
          },
          qty: {
            html: '2',
            value: 2
          },
          price: {
            html: '1000',
            value: 1000
          },
        },
        {
          description: {
            html: 'description 3'
          },
          item: {
            html: '500',
            value: 500
          },
          qty: {
            html: '3',
            value: 3
          },
          price: {
            html: '1500',
            value: 1500
          },
        },
      ]
    }
  },
  {
    id: 'id2',
    type: 'text',
    width: 600,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
    },
  },
  {
    id: 'id3',
    type: 'text',
    width: 500,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
    },
  }
]
