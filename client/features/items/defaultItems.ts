import { ItemsType } from './types'

export const defaultItems: ItemsType = [
  {
    id: 'id0',
    type: 'text editable',
    width: 800,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
      height: 73,
    },
  },
  {
    id: 'id1',
    type: 'boq',
    width: 700,
    height: 73,
    msg: '',
    boq: {
      header: {
        title: {
          html: '<b>Title</b>',
          height: 24
        },
        subtotal: {
          text: {
            html: '<div>Subtotal</div>',
            height: 24,
          },
          price: {
            value: 666,
            html: '<b>666</b>',
            height: 24,
          },
          currency: {
            html: '<div>EUR</div>',
            height: 24,
          }
        }
      }
    }
  },
  {
    id: 'id2',
    type: 'text editable',
    width: 600,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
      height: 73,
    },
  },
  {
    id: 'id3',
    type: 'text editable',
    width: 500,
    height: 73,
    msg: '',
    text: {
      html: '<div>editable text</div>',
      height: 73,
    },
  },
  {
    id: 'id4',
    type: 'text',
    width: 400,
    height: 73,
    msg: '',
    text: {
      html: '<div>not editable text</div>'
    },
  }
]
