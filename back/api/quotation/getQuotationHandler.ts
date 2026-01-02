import { getUserFromAccessTokenOrNull } from '@back/entities/user'
import { HttpError } from '@back/shared/errors/HttpError'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpStatusCode } from '@back/shared/const/httpCode'
import { userRole } from '@back/shared/const/userRole'
import { getShouldNotTrace } from '@back/shared/headers'
import { bucket, getFileInfo } from '@back/shared/lib/google-cloud-storage'
import { jsonParseSafe } from '@back/shared/util/jsonParseSafe'
import type { Quotation } from '@root/shared/types/Quotation'
import type { NextFunction, Request, Response } from 'express'
import { quotationsTable, type SelectQuotation } from '@back/entities/quotation'
import { db } from '@back/shared/lib/drizzle/db'
import { eq } from 'drizzle-orm'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { permissionLevel } from '@root/shared/const/permissionLevel'
import {
  type HttpResponse,
  httpResponse,
} from '@back/shared/lib/express/httpResponse'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  id: SelectQuotation['id']
}

export type ResBody = {
  quotation: Quotation
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'QUOTATION_NOT_FOUND' | 'FILE_NOT_FOUND_IN_BUCKET'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const getQuotationHandler: RouterHandler = async (req, res, next) => {
  const userFromAccessToken = getUserFromAccessTokenOrNull({ req })

  const messageList: string[] = []

  const emptyQuotation: Quotation = {
    id: req.body.id,
    name: '',
    category: '',
    desc: '',
    info: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    openedAt: null,
    viewedAt: null,
    email: 'unknown@gmail.com',
    permissionLevel: permissionLevel.new,
    access: {
      level: 'nobody',
      userList: [],
    },
    blocks: [],
  }

  const [quotationSelected] = await db
    .select()
    .from(quotationsTable)
    .where(eq(quotationsTable.id, req.body.id))

  if (quotationSelected === undefined) {
    messageList.push('Quotation not found in database')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'QUOTATION_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  const shouldNotTrace = getShouldNotTrace({ req })

  const getPermissionLevel = (): Quotation['permissionLevel'] => {
    const isLoggedUser = userFromAccessToken !== null
    const emailFromToken = userFromAccessToken?.email

    const isOwner = isLoggedUser && emailFromToken === quotationSelected.email

    if (isOwner === true) {
      messageList.push('Owner')

      return permissionLevel.owner
    }

    const isSharedWithYou =
      emailFromToken !== undefined &&
      quotationSelected.access.level === 'custom' &&
      quotationSelected.access.userList.includes(emailFromToken)

    if (isSharedWithYou === true) {
      messageList.push('Shared')

      return permissionLevel.shared
    }

    const isSharedWithEveryone = quotationSelected.access.level === 'everyone'

    if (isSharedWithEveryone === true) {
      messageList.push('Public')

      return permissionLevel.public
    }

    const isSuperAdminOnBehalfOfUser = isLoggedUser && shouldNotTrace

    if (isSuperAdminOnBehalfOfUser === true) {
      messageList.push('Super-admin on behalf of user')

      return permissionLevel.superAdminOnBehalfOfAUser
    }

    const isSuperAdmin =
      isLoggedUser && userFromAccessToken.roles.includes(userRole.superAdmin)

    if (isSuperAdmin === true) {
      messageList.push('Super-admin')

      return permissionLevel.superAdmin
    }

    messageList.push('Forbidden')

    return permissionLevel.forbidden
  }

  const permissionLevelValue = getPermissionLevel()

  if (permissionLevelValue === permissionLevel.forbidden) {
    return httpResponse({
      statusCode: httpStatusCode.success200,
      body: {
        quotation: { ...emptyQuotation, permissionLevel: permissionLevelValue },
        message: messageList.join(' | '),
      },
    })
  }

  const publicOrSharedWithYou =
    permissionLevelValue === permissionLevel.shared ||
    permissionLevelValue === permissionLevel.public

  if (shouldNotTrace === false) {
    if (permissionLevelValue === permissionLevel.owner) {
      const updateResponse = await db
        .update(quotationsTable)
        .set({
          openedAt: new Date().toISOString(),
        })
        .where(eq(quotationsTable.id, req.body.id))
        .catch((error: unknown) => {
          messageList.push('Failed to update "openedAt" field')
          console.error('failed to update "openedAt" field', error)
        })

      if (updateResponse !== undefined && updateResponse.rowCount > 0) {
        messageList.push('Updated "openedAt" field')
      }
    }

    if (publicOrSharedWithYou === true) {
      const updateResponse = await db
        .update(quotationsTable)
        .set({
          viewedAt: new Date().toISOString(),
        })
        .where(eq(quotationsTable.id, req.body.id))
        .catch((error: unknown) => {
          messageList.push('Failed to update "viewedAt" field')
          console.error('failed to update viewedAt field', error)
        })

      if (updateResponse !== undefined && updateResponse.rowCount > 0) {
        messageList.push('Updated "viewedAt" field')
      }
    }
  }

  const fileInfo = getFileInfo({ id: req.body.id })

  const [fileBuffer] = await bucket
    .file(fileInfo.path)
    .download()
    .catch(() => {
      messageList.push('Quotation data not found in storage')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'FILE_NOT_FOUND_IN_BUCKET',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    })

  const quotationJson = fileBuffer.toString()
  const quotationParsed = jsonParseSafe<Quotation>(quotationJson)

  if (quotationParsed === undefined) {
    messageList.push('Quotation data from storage not parsed')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'QUOTATION_NOT_FOUND',
      statusCode: httpStatusCode.notFound404,
      message: messageList.join(' | '),
    })
  }

  if (publicOrSharedWithYou === true) {
    // remove sensitive data from quotation
    // quotation.email = 'unknown@gmail.com'
    quotationParsed.name = 'private'
    quotationParsed.category = 'private'
    quotationParsed.desc = 'private'
    quotationParsed.info = 'private'
    quotationParsed.createdAt = new Date().toISOString()
    quotationParsed.updatedAt = new Date().toISOString()
    quotationParsed.openedAt = new Date().toISOString()

    quotationParsed.blocks.forEach((block) => {
      // block.email = 'unknown@gmail.com'
      block.name = 'private'
      block.category = 'private'
      block.desc = 'private'
      block.info = 'private'
      block.createdAt = new Date().toISOString()
      block.updatedAt = new Date().toISOString()

      if (block.type === 'boq') {
        block.boq.rows.forEach((row) => {
          // row.email = 'unknown@gmail.com'
          row.name = 'private'
          row.category = 'private'
          row.desc = 'private'
          row.info = 'private'
          row.createdAt = new Date().toISOString()
          row.updatedAt = new Date().toISOString()
        })
      }
    })

    messageList.push('Private data is hidden')
  }

  return httpResponse({
    statusCode: httpStatusCode.success200,
    body: {
      quotation: {
        ...quotationParsed,
        ...quotationSelected,
        permissionLevel: permissionLevelValue,
      },
      message: messageList.join(' | '),
    },
  })
}
