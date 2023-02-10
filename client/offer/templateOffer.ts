export type ItemType = {
  id: string
  type: string
  width: string
  innerHtml: string
  height: number
}

export type OfferType = {
  items: ItemType[]
}

export const templateOffer: OfferType = {
  items: [
    {
      id: 'id0',
      type: 'text',
      width: '800px',
      height: 0,
      innerHtml: '<div>0</div><div>0</div><div>0</div><div>0</div>'
    },
    {
      id: 'id1',
      type: 'text',
      width: '800px',
      height: 0,
      innerHtml: '<div>1</div><div>1</div>'
    },
    {
      id: 'id2',
      type: 'text',
      width: '800px',
      height: 0,
      innerHtml: '<div>2</div>'
    },
    {
      id: 'id3',
      type: 'text',
      width: '800px',
      height: 0,
      innerHtml: '<div>3</div>'
    },
    {
      id: 'id4',
      type: 'text',
      width: '800px',
      height: 0,
      innerHtml: '<div>4</div>'
    }
  ]
}
