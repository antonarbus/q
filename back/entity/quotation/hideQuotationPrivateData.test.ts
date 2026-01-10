import { expect, test, describe } from 'vitest'
import { hideQuotationPrivateData } from './hideQuotationPrivateData'
import { createMockQuotationOfLatestVersion } from './fixture/createMockQuotationOfLatestVersion'

describe('#hideQuotationPrivateData', () => {
  test('ensure original quotation has been mutated and private data got removed', () => {
    const quotation = createMockQuotationOfLatestVersion()
    expect(quotation.name).toBe('quotation name')

    hideQuotationPrivateData({ quotation })
    expect(quotation.name).toBe('private')
  })
})
