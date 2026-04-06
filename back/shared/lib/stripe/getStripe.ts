// oxlint-disable import/no-named-as-default
import Stripe from 'stripe'
import { getSecret } from '@back/shared/lib/secret-manager/getSecret'

let stripeInstance: Stripe | null = null

export const getStripe = async (): Promise<Stripe> => {
  if (stripeInstance !== null) {
    return stripeInstance
  }

  const secretKey = await getSecret('STRIPE_SECRET_KEY')

  stripeInstance = new Stripe(secretKey)

  return stripeInstance
}
