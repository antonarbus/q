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
    id0: {
      pos: 0,
      id: 'id0',
      type: 'text',
      width: '800px',
      innerHtml: '<div>0</div><div>0</div><div>0</div><div>0</div>'
    },
    id1: {
      pos: 1,
      id: 'id1',
      type: 'text',
      width: '800px',
      innerHtml: '<div>1</div><div>1</div>'
    },
    id2: {
      pos: 2,
      id: 'id2',
      type: 'text',
      width: '800px',
      innerHtml: '<div>2</div>'
    },
    id3: {
      pos: 3,
      id: 'id3',
      type: 'text',
      width: '800px',
      innerHtml: '<div>3</div>'
    },
    id4: {
      pos: 4,
      id: 'id4',
      type: 'text',
      width: '800px',
      innerHtml: '<div>4</div>'
    }
  }
}
