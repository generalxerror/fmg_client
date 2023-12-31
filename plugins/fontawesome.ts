// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck, faCircleNotch, faCircleUser, faCircleXmark, faQuoteLeft, faQuoteRight, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

library.add(
  faCircleUser,
  faCircleNotch,
  faQuoteLeft,
  faQuoteRight,
  faSquare,
  faSquareCheck,
  faCircleCheck,
  faCircleXmark
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
