import { apiUrl } from '@back/consts/apiUrl'
import { connectToDb } from '@back/db/connectToDb'
import { UserModel } from '@back/db/models/userModel'
import { baseUrlBack } from '@back/utils/env'
import { test, expect } from '@playwright/test'
import { userFilePath } from 'tests/setup/userFilePath'

test.describe.configure({ mode: 'serial' })

test.describe('#activateRouter', () => {
  test.beforeAll(async () => {
    await connectToDb()
  })

  test.afterAll(async ({ request }) => {
    // console.log('do after test, for ex clean db')
  })

  test.use({ baseURL: baseUrlBack })

  const email = 'anton.arbus@gmail.com'

  test('should not return successful status if key is missing', async ({
    request,
  }) => {
    const res = await request.post(apiUrl.activate, {
      data: {
        activationKey: 'bad activation key',
      },
    })

    expect(res.ok()).toBeFalsy()
    expect(await res.json()).toMatchObject({
      message: 'activation key not found',
    })
  })

  test('should return successful status if activation key is correct', async ({
    request,
  }) => {
    const userDocument = await UserModel.findOneAndUpdate(
      { email },
      {
        activationKey: 'good activation key',
        isActivated: false,
      },
      { upsert: true, new: true },
    ).lean()

    const res = await request.post(apiUrl.activate, {
      data: {
        activationKey: userDocument.activationKey,
      },
    })

    await request.storageState({ path: userFilePath.authenticated })

    expect(res.ok()).toBeTruthy()
    expect(await res.json()).toMatchObject({ message: 'activated' })
  })

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
