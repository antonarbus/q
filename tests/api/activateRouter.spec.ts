import { apiUrl } from '@back/consts/apiUrl'
import { baseUrlBack } from '@back/utils/env'
import { test, expect } from '@playwright/test'

test.describe('activateRouter', () => {
  test('should not return successful status if key is missing', async ({
    request,
  }) => {
    const res = await request.post(`${baseUrlBack}${apiUrl.activate}`, {
      data: {
        activationKey: 'bad activation key',
      },
    })

    expect(res.ok()).toBeFalsy()
    expect(await res.json()).toMatchObject({
      message: 'activation key not found',
    })
  })
})
