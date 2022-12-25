export type ItemType = {
  pos: number
  id: string
  type: string
  width: string
  innerHtml: string
}

export type OfferType = {
  items: {
    [key: string]: ItemType
  }
}

export const templateOffer: OfferType = {
  items: {
    'id 00': {
      pos: 0,
      id: 'id 00',
      type: 'text',
      width: '800px',
      innerHtml: '<div>0</div><div>0</div><div>0</div><div>0</div>'
    },
    'id 01': {
      pos: 1,
      id: 'id 01',
      type: 'text',
      width: '800px',
      innerHtml: '<div>1</div><div>1</div>'
    },
    'id 02': {
      pos: 2,
      id: 'id 02',
      type: 'text',
      width: '800px',
      innerHtml: '<div>2</div>'
    },
    'id 03': {
      pos: 3,
      id: 'id 03',
      type: 'text',
      width: '800px',
      innerHtml: '<div>3</div>'
    },
    'id 04': {
      pos: 4,
      id: 'id 04',
      type: 'text',
      width: '800px',
      innerHtml: '<div>4</div>'
    }
  }
}
