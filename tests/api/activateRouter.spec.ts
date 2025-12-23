import { route } from '@back/api/route'
import { UserModel } from '@back/entities/user'
import { connectToDb } from '@back/shared/lib/mongoose/connectToDb'
import { expect, test } from '@playwright/test'
import { runtimeConfig } from '@root/config/runtime'

test.describe.configure({ mode: 'serial' })

test.describe('#activateRouter', () => {
  test.beforeAll(async () => {
    await connectToDb()
  })

  test.use({ baseURL: runtimeConfig.back.baseUrl })

  const email = 'test-user@sendmequotation.today'

  test('should return successful status if account had been already activated', async ({
    request,
  }) => {
    const userDocument = await UserModel.findOneAndUpdate(
      { email },
      { isActivated: true },
      { upsert: true, new: true },
    ).lean()

    const res = await request[route.activate.method](route.activate.url, {
      data: {
        activationKey: userDocument.activationKey,
      },
    })

    expect(res.ok()).toBeTruthy()
    expect(await res.json()).toMatchObject({ message: 'already activated' })
  })
})
