import Vue from 'vue'
import App from './App.vue'
import tools from "./components/plugin/tool"
import util from "./components/plugin/util"
Vue.config.productionTip = false;
Vue.prototype.tools = tools;
Vue.prototype.util = util;
new App().$mount();
