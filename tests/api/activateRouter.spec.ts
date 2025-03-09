import { config } from '@back/config'
import { UserModel } from '@back/entities/user'
import { apiUrl } from '@back/shared/consts/apiUrl'
import { connectToDb } from '@back/shared/db/connectToDb'
import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'serial' })

test.describe('#activateRouter', () => {
  test.beforeAll(async () => {
    await connectToDb()
  })

  test.afterAll(async ({ request }) => {
    // console.log('do after test, for ex clean db')
  })

  test.use({ baseURL: config.back.baseUrl })

  const email = 'test-user@sendmequotation.today'

  test('should return successful status if account had been already activated', async ({
    request,
  }) => {
    const userDocument = await UserModel.findOneAndUpdate(
      { email },
      { isActivated: true },
      { upsert: true, new: true },
    ).lean()

    const res = await request.post(apiUrl.activate, {
      data: {
        activationKey: userDocument.activationKey,
      },
    })

    expect(res.ok()).toBeTruthy()
    expect(await res.json()).toMatchObject({ message: 'already activated' })
  })
})
