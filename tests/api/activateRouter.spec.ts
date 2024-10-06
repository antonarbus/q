import { apiUrl } from '@back/consts/apiUrl'
import { UserModel } from '@back/db/models/userModel'
import { baseUrlBack } from '@back/utils/env'
import type { User } from '@entities/user'
import { test, expect } from '@playwright/test'

test.describe.only('activateRouter', () => {
  // set activation key in db
  let goodActivationKey: User['activationKey'] = 'bad activation key'

  test.beforeAll(async () => {
    console.log('🚀 ~ before all started')
    const users = await UserModel.find()
    console.log('🚀 ~ users:', users)
    const userDocument = await UserModel.findOneAndUpdate(
      { email: 'anton.arbus@gmail.com' },
      { activationKey: 'good activation key' },
      { upsert: true, new: true },
    ).lean()

    if (!userDocument.activationKey) {
      throw new Error('Activation key in undefined, something is wrong')
    }

    goodActivationKey = userDocument.activationKey
  })

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

  test('should return successful status if activation key is correct', async ({
    request,
  }) => {
    const res = await request.post(`${baseUrlBack}${apiUrl.activate}`, {
      data: {
        activationKey: goodActivationKey,
      },
    })

    expect(res.ok()).toBeTruthy()
    expect(await res.json()).toMatchObject({
      message: 'activated',
    })
  })
})
