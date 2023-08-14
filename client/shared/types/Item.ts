interface ICommon {
  id: string
  width: number
  height: number
  msg: string
  // previewHtml: string
}

interface IBoqRow {
  id: string
  description: {
    html: string
  }
  item: {
    html: string
    value: number
  }
  qty: {
    html: string
    value: number
  }
  price: {
    html: string
    value: number
  }
}

interface IBoqCols {
  description: {
    html: string
    width: number | undefined
  }
  item: {
    html: string
    width: number | undefined
  }
  qty: {
    html: string
    width: number | undefined
  }
  price: {
    html: string
    width: number | undefined
  }
}

interface IBoqItem extends ICommon {
  type: 'boq'
  boq: {
    header: {
      title: {
        html: string
      }
      subtotal: {
        text: {
          html: string
        }
        price: {
          value: number
          html: string
        }
        currency: {
          html: string
        }
      }
    }
    column: IBoqCols
    rows: IBoqRow[]
  }
}

interface ITextItem extends ICommon {
  type: 'text'
  text: {
    html: string
  }
}

export interface IPasteItem extends ICommon {
  type: 'paste'
}

export type TItem = IBoqItem | IPasteItem | ITextItem


export type THtmlGetter = (props: { index: number, rowIndex?: number }) => string