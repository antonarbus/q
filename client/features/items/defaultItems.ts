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
      height: 0,
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
        height: 0,
        title: {
          html: '<b>Title</b>',
          height: 0,
        },
        subtotal: {
          text: {
            html: '<div>Subtotal</div>',
            height: 0,
          },
          price: {
            value: 666,
            html: '<b>666</b>',
            height: 0,
          },
          currency: {
            html: '<div>EUR</div>',
            height: 0,
          },
        },
      },
      column: {
        description: {
          html: '<b>Description</b>',
          height: 0,
          width: 200,
        },
        item: {
          html: '<b>Item</b>',
          height: 0,
          width: 100,
        },
        qty: {
          html: '<b>Qty</b>',
          height: 0,
          width: 100,
        },
        price: {
          html: '<b>Price</b>',
          height: 0,
          width: 100,
        },
      },
      rows: [
        {
          description: {
            html: 'description 1',
            height: 0,
          },
          item: {
            html: '500',
            height: 0,
            value: 500,
          },
          qty: {
            html: '1',
            height: 0,
            value: 1,
          },
          price: {
            html: '500',
            height: 0,
            value: 500,
          },
        },
        {
          description: {
            html: 'description 2',
            height: 0,
          },
          item: {
            html: '500',
            height: 0,
            value: 500,
          },
          qty: {
            html: '2',
            height: 0,
            value: 2,
          },
          price: {
            html: '1000',
            height: 0,
            value: 1000,
          },
        },
        {
          description: {
            html: 'description 3',
            height: 0,
          },
          item: {
            html: '500',
            height: 0,
            value: 500,
          },
          qty: {
            html: '3',
            height: 0,
            value: 3,
          },
          price: {
            html: '1500',
            height: 0,
            value: 1500,
          },
        },
      ],
    },
  },
  {
    id: nanoid(3),
    type: 'text',
    width: 600,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
      height: 0,
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
      height: 0,
    },
  },
]
