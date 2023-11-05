import { getRequest } from './remoteService'

export const getApp = (appId: string): Promise<any> => {
  return getRequest(`apps/${appId}`)
}
