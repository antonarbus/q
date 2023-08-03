import { nanoid } from 'nanoid'
import type { TItems } from './types'

export const defaultItems: TItems = [
  {
    id: nanoid(3),
    type: 'text',
    width: 800,
    height: 0,
    msg: '',
    previewHtml: '',
    text: {
      html: '<div>editable text</div>',
    },
  },
  // {
  //   id: nanoid(3),
  //   type: 'boq',
  //   width: 700,
  //   height: 0,
  //   msg: '',
  //   previewHtml: '',
  //   boq: {
  //     header: {
  //       title: {
  //         html: '<b>Title</b>',
  //       },
  //       subtotal: {
  //         text: {
  //           html: '<div>Subtotal</div>',
  //         },
  //         price: {
  //           value: 666,
  //           html: '<b>666</b>',
  //         },
  //         currency: {
  //           html: '<div>EUR</div>',
  //         },
  //       },
  //     },
  //     column: {
  //       description: {
  //         html: '<b>Description</b>',
  //         width: undefined,
  //       },
  //       item: {
  //         html: '<b>Item</b>',
  //         width: undefined,
  //       },
  //       qty: {
  //         html: '<b>Qty</b>',
  //         width: undefined,
  //       },
  //       price: {
  //         html: '<b>Price</b>',
  //         width: undefined,
  //       },
  //     },
  //     rows: [
  //       {
  //         id: nanoid(3),
  //         description: {
  //           html: 'description 1',
  //         },
  //         item: {
  //           html: '500',
  //           value: 500,
  //         },
  //         qty: {
  //           html: '1',
  //           value: 1,
  //         },
  //         price: {
  //           html: '500',
  //           value: 500,
  //         },
  //       },
  //       {
  //         id: nanoid(3),
  //         description: {
  //           html: 'description 2',
  //         },
  //         item: {
  //           html: '500',
  //           value: 500,
  //         },
  //         qty: {
  //           html: '2',
  //           value: 2,
  //         },
  //         price: {
  //           html: '1000',
  //           value: 1000,
  //         },
  //       },
  //       {
  //         id: nanoid(3),
  //         description: {
  //           html: 'description 3',
  //         },
  //         item: {
  //           html: '500',
  //           value: 500,
  //         },
  //         qty: {
  //           html: '3',
  //           value: 3,
  //         },
  //         price: {
  //           html: '1500',
  //           value: 1500,
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    id: nanoid(3),
    type: 'text',
    width: 600,
    height: 0,
    msg: '',
    previewHtml: '',
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
    previewHtml: '',
    text: {
      html: '<div>editable text</div>',
    },
  },
]
