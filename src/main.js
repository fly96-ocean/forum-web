import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import Vuex from 'vuex';
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)




require('./mock.js');

Vue.use(Vuex);
Vue.use(VueQuillEditor);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
});
const store = new Vuex.Store({}); // 这里你可能已经有其他 module
store.registerModule('vantStore', {
  state: {
    bottomActive: true,
    headTitle: '首页',
    goodsCart: []
  },
  mutations: {
    updatebottomActive: function(state, payload) {
      state.bottomActive = payload;
    },
    updateheadTitle: function(state, payload) {
      state.headTitle = payload;
    }
  }
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
