import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import './style/style.scss'

import Common from './common'

Vue.config.productionTip = false


Vue.use(VueCompositionApi)
Vue.use(Common)

new Vue({
    render: h => h(App),
}).$mount('#app')
