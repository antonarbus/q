import { useEffectOnce } from 'react-use'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const useHandleStripeConnectSuccess = (): void => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffectOnce(() => {
    if (searchParams.get('stripe_connected') === 'true') {
      setSearchParams({}, { replace: true })
      toast.success('Stripe connected — you can now generate payment links')
    }
  })
}
