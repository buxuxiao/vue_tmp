import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import router from './router'

import 'vue-datetime/dist/vue-datetime.css'
import { Datetime } from 'vue-datetime';

Vue.use(Datetime)

Vue.component('datetime', Datetime);

Vue.config.productionTip = false

MuseUI.theme.use('light');

Vue.use(MuseUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
