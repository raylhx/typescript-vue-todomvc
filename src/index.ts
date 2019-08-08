import Vue from 'vue'
import App from './components/index.vue'

const app = new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
})
