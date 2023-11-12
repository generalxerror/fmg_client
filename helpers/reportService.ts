import { getRequest, postRequest } from './remoteService'
import { newReport } from '~/types/newReport'

export const mine = (): Promise<any> => {
  return getRequest('reports/mine')
}

export const submit = (reportForm: newReport): Promise<any> => {
  return postRequest('reports/create', {
    app_id: reportForm.storeId,
    comment: reportForm.comment,
    works_offline: reportForm.worksOffline ? 1 : 0,
    fake_ad: reportForm.fakeAd
  })
}
