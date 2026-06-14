import { useEffectOnce } from 'react-use'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { route } from '@front/shared/lib/react-router-dom/route'
import { toast } from 'sonner'

export const useHandleSubscriptionSuccess = (): void => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffectOnce(() => {
    if (searchParams.get('subscription') === 'success') {
      setSearchParams({}, { replace: true })
      toast.success('Payment successful — you can now save your quotation')
      void navigate(route.save)
    }
  })
}
