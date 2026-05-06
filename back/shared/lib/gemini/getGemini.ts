import { GoogleGenerativeAI } from '@google/generative-ai'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'

type GeminiCached = {
  client: GoogleGenerativeAI
}

let geminiCached: GeminiCached | null = null

export const getGemini = async (): Promise<GeminiCached> => {
  if (geminiCached !== null) {
    return geminiCached
  }

  const apiKey = await getSecret('GEMINI_API_KEY')

  geminiCached = {
    client: new GoogleGenerativeAI(apiKey),
  }

  return geminiCached
}
