import Toast, { POSITION, TYPE, useToast } from 'vue-toastification'
import Notification from '@/components/ToastNotification.vue'

const toast = useToast()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    transition: 'Vue-Toastification__slideBlurred'
  })

  return {
    provide: {
      showToast: (msg: Array<string>, type: string, time = 3000) => {
        const toastContent = {
          component: Notification,
          props: {
            messages: msg
          }
        }

        let typeFormatted = TYPE.DEFAULT
        switch (type) {
          case 'success':
            typeFormatted = TYPE.SUCCESS
            break
          case 'error':
            typeFormatted = TYPE.ERROR
            break
          case 'warning':
            typeFormatted = TYPE.WARNING
            break
        }

        return toast(toastContent, {
          timeout: time,
          type: typeFormatted,
          position: POSITION.BOTTOM_CENTER,
          showCloseButtonOnHover: false,
          closeButton: false,
          icon: false
        })
      }
    }
  }
})
