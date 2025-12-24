import { route } from '@back/api/route'
import { usersTable } from '@back/entities/user'
import { db } from '@back/shared/lib/drizzle/db'
import { expect, test } from '@playwright/test'
import { runtimeConfig } from '@root/config/runtime'
import { eq } from 'drizzle-orm'
import { generateId } from '@back/shared/lib/nanoid'
import { userRole } from '@back/shared/const/userRole'

test.describe.configure({ mode: 'serial' })

test.describe('#activateRouter', () => {
  test.use({ baseURL: runtimeConfig.back.baseUrl })

  const testUserEmail = 'test-user@sendmequotation.today'

  // Clean up test data before each test to ensure isolation
  test.beforeEach(async () => {
    await db.delete(usersTable).where(eq(usersTable.email, testUserEmail))
  })

  // Clean up test data after each test
  test.afterEach(async () => {
    await db.delete(usersTable).where(eq(usersTable.email, testUserEmail))
  })

  test('should return successful status if account had been already activated', async ({
    request,
  }) => {
    // Arrange: Create an already-activated user
    const activationKey = generateId()

    const [userDocument] = await db
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

    if (userDocument === undefined) {
      throw new Error('Failed to create test user')
    }

    // Act: Attempt to activate again
    const res = await request[route.activate.method](route.activate.url, {
      data: {
        activationKey: userDocument.activationKey,
      },
    })

    // Assert: Should return "already activated"
    expect(res.ok()).toBeTruthy()
    expect(await res.json()).toMatchObject({ message: 'already activated' })
  })
})
