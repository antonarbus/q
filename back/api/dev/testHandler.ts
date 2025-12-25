import { getUserFromRefreshTokenOrJohn, usersTable } from '@back/entities/user'
import { httpStatusCode } from '@back/shared/const/HttpStatusCode'
import { userRole } from '@back/shared/const/userRole'
import type { NextFunction, Request, Response } from 'express'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'

type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>

export const testHandler: RouterHandler = async (req, res, _next) => {
  const userFromRefreshToken = getUserFromRefreshTokenOrJohn({ req })

  if (userFromRefreshToken.roles.includes(userRole.superAdmin) === false) {
    res.status(httpStatusCode.forbidden403).json({ message: 'forbidden' })

    return
  }

  const userListSelected = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, 'some random guy'))

  res.status(200).json({ dbRes: userListSelected })
}
