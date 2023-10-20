import { getRequest } from './remoteService'

export const me = (): Promise<any> => {
  return getRequest('user/me')
}

export const logout = (): Promise<any> => {
  return getRequest('user/logout')
}
