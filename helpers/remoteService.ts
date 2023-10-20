export const getRequest = (url: string, params: null|object = null) => {
  return $fetch(url, {
    method: 'GET',
    ...params
  })
}

export const postRequest = (url: string, data: any) => {
  return $fetch(url, {
    method: 'POST',
    body: data
  })
}
