import { postRequest } from './remoteService'

export const search = (searchQuery: string): Promise<any> => {
  return postRequest('store/search', {
    search_query: searchQuery
  })
}
