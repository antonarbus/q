import { route } from '@back/api/route'
import { usersTable } from '@back/entities/user'
import { db } from '@back/shared/lib/drizzle/db'
import { expect, test } from '@playwright/test'
import { runtimeConfig } from '@root/config/runtime'
import { generateId } from '@back/shared/lib/nanoid'
import { userRole } from '@back/shared/const/userRole'

test.describe.configure({ mode: 'serial' })

test.describe('#activateRouter', () => {
  test.use({ baseURL: runtimeConfig.back.baseUrl })

  const testUserEmail = 'test-user@sendmequotation.today'

  test('should return successful status if account had been already activated', async ({
    request,
  }) => {
    // Arrange: Create an already-activated user
    const activationKey = generateId()

    const [userInserted] = await db
      .insert(usersTable)
      .values({
        email: testUserEmail,
        password: 'test-password-hash',
        activationKey,
        roles: [userRole.user],
        isActivated: true,
      })
      .onConflictDoUpdate({
        target: usersTable.email,
        set: { isActivated: true, activationKey },
      })
      .returning()

    if (userInserted === undefined) {
      throw new Error('Failed to create test user')
    }

    // Act: Attempt to activate again
    const res = await request[route.activate.method](route.activate.url, {
      data: {
        activationKey: userInserted.activationKey,
      },
    })

    // Assert: Should return 409
    expect(res.ok()).toBeFalsy()
    expect(res.status()).toBe(409)
  })
})
