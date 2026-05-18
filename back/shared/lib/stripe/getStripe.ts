// oxlint-disable-next-line import/no-named-as-default
import Stripe from 'stripe'
import { runtimeConfig } from '@root/config/runtime'
import type { SecretName } from '@back/shared/lib/secret-manager/getSecret'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'
import type { RuntimeEnvironment } from '@root/config/environment'

type StripeCached = {
  instance: Stripe
  clientId: string
  // Two separate webhook destinations per environment — one per Stripe scope.
  // The handler tries both; whichever verifies the signature is the correct one.
  webhookSecret: {
    account: string // "Your account" scope — platform subscription payments
    connected: string // "Connected accounts" scope — quotation payments, Connect disconnects
  }
  subscriptionPriceId: string
}

let stripeCached: StripeCached | null = null

export const getStripe = async (): Promise<StripeCached> => {
  if (stripeCached !== null) {
    return stripeCached
  }

  const isLive = runtimeConfig.environment === 'pilot' || runtimeConfig.environment === 'prod'

  const webhookSecretNameConnected: Record<RuntimeEnvironment, SecretName> = {
    unknown: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV',
    local: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV',
    dev: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV',
    test: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_TEST',
    pilot: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_PILOT',
    prod: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_LIVE',
  }

  // For local dev, stripe listen gives one secret that covers all events
  const webhookSecretNameAccount: Record<RuntimeEnvironment, SecretName> = {
    unknown: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV',
    local: 'STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV',
    dev: 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV',
    test: 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_TEST',
    pilot: 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_PILOT',
    prod: 'STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_LIVE',
  }

  const [stripeSecretKey, stripeClientId, webhookSecretConnected, webhookSecretAccount, priceId] =
    await Promise.all([
      getSecret(isLive ? 'STRIPE_SECRET_KEY_LIVE' : 'STRIPE_SECRET_KEY_TEST'),
      getSecret(isLive ? 'STRIPE_CLIENT_ID_LIVE' : 'STRIPE_CLIENT_ID_TEST'),
      getSecret(webhookSecretNameConnected[runtimeConfig.environment]),
      getSecret(webhookSecretNameAccount[runtimeConfig.environment]),
      getSecret(
        isLive
          ? 'STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE'
          : 'STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST',
      ),
    ])

  stripeCached = {
    instance: new Stripe(stripeSecretKey),
    clientId: stripeClientId,
    webhookSecret: {
      account: webhookSecretAccount,
      connected: webhookSecretConnected,
    },
    subscriptionPriceId: priceId,
  }

  return stripeCached
}
