// oxlint-disable-next-line import/no-named-as-default
import Stripe from 'stripe'
import { runtimeConfig } from '@root/config/runtime'
import type { SecretName } from '@back/shared/lib/secret-manager/getSecret'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'
import type { RuntimeEnvironment } from '@root/config/environment'

type StripeCached = {
  instance: Stripe
  clientId: string
  webhookSecret: string
  subscriptionPriceId: { monthly: string; annual: string }
}

let stripeCached: StripeCached | null = null

export const getStripe = async (): Promise<StripeCached> => {
  if (stripeCached !== null) {
    return stripeCached
  }

  const isLive = runtimeConfig.environment === 'pilot' || runtimeConfig.environment === 'prod'

  const webhookSecretName: Record<RuntimeEnvironment, SecretName> = {
    unknown: 'STRIPE_DEV_WEBHOOK_SECRET',
    local: 'STRIPE_DEV_WEBHOOK_SECRET',
    dev: 'STRIPE_DEV_WEBHOOK_SECRET',
    test: 'STRIPE_TEST_WEBHOOK_SECRET',
    pilot: 'STRIPE_PILOT_WEBHOOK_SECRET',
    prod: 'STRIPE_LIVE_WEBHOOK_SECRET',
  }

  const [stripeSecretKey, stripeClientId, stripeWebhookSecret, priceIdMonthly, priceIdAnnual] =
    await Promise.all([
      getSecret(isLive ? 'STRIPE_LIVE_SECRET_KEY' : 'STRIPE_TEST_SECRET_KEY'),
      getSecret(isLive ? 'STRIPE_LIVE_CLIENT_ID' : 'STRIPE_TEST_CLIENT_ID'),
      getSecret(webhookSecretName[runtimeConfig.environment]),
      getSecret(
        isLive
          ? 'STRIPE_LIVE_SUBSCRIPTION_PRICE_ID_MONTHLY'
          : 'STRIPE_TEST_SUBSCRIPTION_PRICE_ID_MONTHLY',
      ),
      getSecret(
        isLive
          ? 'STRIPE_LIVE_SUBSCRIPTION_PRICE_ID_ANNUAL'
          : 'STRIPE_TEST_SUBSCRIPTION_PRICE_ID_ANNUAL',
      ),
    ])

  stripeCached = {
    instance: new Stripe(stripeSecretKey),
    clientId: stripeClientId,
    webhookSecret: stripeWebhookSecret,
    subscriptionPriceId: {
      monthly: priceIdMonthly,
      annual: priceIdAnnual,
    },
  }

  return stripeCached
}
