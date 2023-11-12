import { getRequest, postRequest } from './remoteService'

export const getApp = (appId: string): Promise<any> => {
  return getRequest(`apps/${appId}`)
}

export const searchApps = (searchQuery: string): Promise<any> => {
  return postRequest('apps/search', {
    search_query: searchQuery
  })
}
