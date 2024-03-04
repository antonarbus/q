import { useGetQuotation } from '../api/useGetQuotation'

export const FetchQuotation = (): JSX.Element => {
  const { data, isFetching } = useGetQuotation()
  console.log('🚀 ~ isFetching:', isFetching)
  console.log('🚀 ~ data:', data)

  return (
    <div>hello {isFetching.toString()}</div>
  )
}
