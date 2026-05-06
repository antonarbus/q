import { getUserFromAccessTokenOrThrowUnauthorized } from '@back/entity/user/getUserFromAccessTokenOrThrowUnauthorized'
import { HttpError } from '@back/shared/errors/HttpError'
import { httpStatusCode } from '@back/shared/const/httpStatusCode'
import type { ErrorCode } from '@back/shared/const/errorCode'
import { httpJsonResponse } from '@back/shared/lib/express/httpResponse'
import type { HttpResponse } from '@back/shared/lib/express/httpResponse'
import { getGemini } from '@back/shared/lib/gemini/getGemini'
import type { NextFunction, Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'
import { z } from 'zod'
import dedent from 'dedent'

type SearchQuery = ParsedQs
type UrlParam = ParamsDictionary

export type ReqBody = {
  userPrompt: string
}

export type ResBody = {
  description: string
  itemPrice: number
  supplierNotes: string
  message: string
}

export type ErrorResBody = {
  message: string
  errorCode: ErrorCode | 'GEMINI_GENERATION_FAILED' | 'AI_RESPONSE_PARSE_FAILED'
}

type RouterHandler = (
  req: Request<UrlParam, ResBody, ReqBody, SearchQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<HttpResponse<ResBody>>

export const suggestRowHandler: RouterHandler = async (req) => {
  await getUserFromAccessTokenOrThrowUnauthorized({ req })

  const messageList: string[] = []

  const gemini = await getGemini()

  const geminiModel = gemini.client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    tools: [{ googleSearchRetrieval: {} }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  })

  const prompt = dedent` 
    You are a procurement assistant. The user is looking for: "${req.body.userPrompt}"

    Search the internet for real supplier and pricing information. Return ONLY strict JSON (no markdown fences, no explanation):

    {
      "description": "clear, concise item description",
      "itemPrice": 45.00,
      "supplierNotes": "Supplier: X, Region: Y, typical lead time, etc."
    }

    Rules:
    - itemPrice must be a number (not a string), representing the unit price in USD
    - supplierNotes should include supplier name, region, and relevant sourcing details
    - description should be professional and concise
  `

  const result = await geminiModel.generateContent(prompt).catch(() => {
    messageList.push('Gemini failed to generate response')

    throw new HttpError<ErrorResBody['errorCode']>({
      errorCode: 'GEMINI_GENERATION_FAILED',
      statusCode: httpStatusCode.serverError500,
      message: messageList.join(' | '),
    })
  })

  const text = result.response.text()

  messageList.push(`Gemini response received`)

  const parsed = await z
    .object({
      description: z.string(),
      itemPrice: z.number(),
      supplierNotes: z.string(),
    })
    .parseAsync(JSON.parse(text))
    .catch(() => {
      messageList.push('Response parsing failed')

      throw new HttpError<ErrorResBody['errorCode']>({
        errorCode: 'AI_RESPONSE_PARSE_FAILED',
        statusCode: httpStatusCode.serverError500,
        message: messageList.join(' | '),
      })
    })

  messageList.push('Row suggestion generated successfully')

  return httpJsonResponse({
    statusCode: httpStatusCode.success200,
    body: {
      description: parsed.description,
      itemPrice: parsed.itemPrice,
      supplierNotes: parsed.supplierNotes,
      message: messageList.join(' | '),
    },
  })
}
