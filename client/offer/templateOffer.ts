export type ItemType = {
  position: number
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
    'random id 01': {
      position: 1,
      id: 'id 01',
      type: 'text',
      width: '800px',
      innerHtml: '<div>hello</div><div>hello</div><div>hello</div><div>hello</div>'
    },
    'random id 02': {
      position: 2,
      id: 'id 02',
      type: 'text',
      width: '800px',
      innerHtml: '<div>hello</div>'
    }
  }
}
