import { VueConstructor } from 'vue'
import dayJs from 'dayjs'

export default {
    install(Vue: VueConstructor) {
        Vue.filter('date', (value: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
            if (!value) {
                return value
            }
            return dayJs(value).format(format)
        })
    },
}
