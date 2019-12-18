import filter from './filter'
import { VueConstructor } from 'vue/types/vue'

export default {
    install(Vue: VueConstructor) {
        Vue.use(filter)
    },
}
