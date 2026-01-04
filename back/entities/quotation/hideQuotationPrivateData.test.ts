import { expect, test, describe } from 'vitest'
import { hideQuotationPrivateData } from './hideQuotationPrivateData'
import { getEmptyQuotation } from './emptyQuotation'

describe('#hideQuotationPrivateData', () => {
  test('ensure original object has been mutated', () => {
    const quotation = getEmptyQuotation({ id: 'abc' })

    expect(quotation.data.name, 'originally it is an empty string').toBe('')

    hideQuotationPrivateData({ quotation })

    expect(quotation.data.name, 'function changes fields to "private"').toBe(
      'private',
    )
  })
})
