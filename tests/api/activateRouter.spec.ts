import { api } from '@back/api'
import { config } from '@back/config'
import { UserModel } from '@back/entities/user'
import { connectToDb } from '@back/shared/lib/mongoose/connectToDb'
import { expect, test } from '@playwright/test'

test.describe.configure({ mode: 'serial' })

test.describe('#activateRouter', () => {
  test.beforeAll(async () => {
    await connectToDb()
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

    const res = await request[api.activate.method](api.activate.url, {
      data: {
        activationKey: userDocument.activationKey,
      },
    })

    expect(res.ok()).toBeTruthy()
    expect(await res.json()).toMatchObject({ message: 'already activated' })
  })
})
