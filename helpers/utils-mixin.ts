import { POSITION, TYPE, useToast } from 'vue-toastification'
import Notification from '@/components/ToastNotification.vue'

const toast = useToast()

function parseErrorBag (err: any) {
  const errorMessage: string[] = []

  if (err.data.message) {
    errorMessage.push(err.data.message)
  } else if (err.data.error) {
    errorMessage.push(err.data.error)
  } else {
    const errorBag: string[] = err.data.errors
    for (const value of Object.entries(errorBag)) {
      errorMessage.push(value[1])
    }
  }

  return errorMessage
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      errorBag: (err: any) => {
        return parseErrorBag(err)
      },
      handleRequestError: (errObject: any, timeout = 5000) => {
        if (errObject.data.error_msg) {
          return toast(
            {
              component: Notification,
              props: {
                messages: [errObject.data.error_msg]
              }
            },
            {
              timeout,
              type: TYPE.ERROR,
              position: POSITION.BOTTOM_CENTER,
              showCloseButtonOnHover: false,
              closeButton: false,
              icon: false
            })
        } else {
          return toast(
            {
              component: Notification,
              props: {
                messages: parseErrorBag(errObject)
              }
            },
            {
              timeout,
              type: TYPE.ERROR,
              position: POSITION.BOTTOM_CENTER,
              showCloseButtonOnHover: false,
              closeButton: false,
              icon: false
            })
        }
      }
    }
  }
})
