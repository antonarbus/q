import { Stripe } from 'stripe'
import { runtimeConfig } from '@root/config/runtime'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'

type StripeCached = {
  instance: Stripe
  clientId: string
  webhookSecret: string
}

let stripeCached: StripeCached | null = null

export const getStripe = async (): Promise<StripeCached> => {
  if (stripeCached !== null) {
    return stripeCached
  }

  const isLive = runtimeConfig.environment === 'pilot' || runtimeConfig.environment === 'prod'

  const [stripeSecretKey, stripeClientId, stripeWebhookSecret] = await Promise.all([
    getSecret(isLive ? 'STRIPE_LIVE_SECRET_KEY' : 'STRIPE_TEST_SECRET_KEY'),
    getSecret(isLive ? 'STRIPE_LIVE_CLIENT_ID' : 'STRIPE_TEST_CLIENT_ID'),
    getSecret(isLive ? 'STRIPE_LIVE_WEBHOOK_SECRET' : 'STRIPE_TEST_WEBHOOK_SECRET'),
  ])

  stripeCached = {
    instance: new Stripe(stripeSecretKey),
    clientId: stripeClientId,
    webhookSecret: stripeWebhookSecret,
  }

  return stripeCached
}
