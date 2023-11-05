import { getRequest } from './remoteService'

export const homePageItems = (): Promise<any> => {
  return getRequest('misc/home')
}
