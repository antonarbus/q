import { apiUrl } from '@server/consts/apiUrl'
import { type AxiosResponse } from 'axios'
import { type ResBody as Res, type ReqBody as Payload } from 'server/api/saveQuotationRouter'
import { axiosWithAuth } from '@shared/lib/axios/axiosWithAuth'

export const saveQuotationFn = async (payload: Payload): Promise<Res> => {
  const { data } = await axiosWithAuth<Res, AxiosResponse<Res>, Payload>({
    method: 'post',
    url: apiUrl.saveQuotation,
    data: payload,
  })

  return data
}
