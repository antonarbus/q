import { GoogleGenAI } from '@google/genai'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'

type GeminiCached = {
  client: GoogleGenAI
}

let geminiCached: GeminiCached | null = null

export const getGemini = async (): Promise<GeminiCached> => {
  if (geminiCached !== null) {
    return geminiCached
  }

  const apiKey = await getSecret('GEMINI_API_KEY')

  geminiCached = {
    client: new GoogleGenAI({ apiKey }),
  }

  return geminiCached
}
