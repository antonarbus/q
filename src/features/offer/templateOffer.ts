export type itemType = {
  position: number
  id: string
  type: string
  width: string
  innerHtml: string
}

export const templateOffer = {
  items: {
    'id 01': {
      position: 1,
      id: 'id 01',
      type: 'text',
      width: '800px',
      innerHtml: '<div>hello</div><div>hello</div><div>hello</div><div>hello</div>'
    },
    'id 02': {
      position: 2,
      id: 'id 02',
      type: 'text',
      width: '800px',
      innerHtml: '<div>hello</div><div>hello</div><div>hello</div>'
    }
  }
}
