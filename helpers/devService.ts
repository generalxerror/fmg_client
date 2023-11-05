import { getRequest } from './remoteService'

export const getDeveloper = (devId: string): Promise<any> => {
  return getRequest(`devs/${devId}`)
}
