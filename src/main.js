import { createApp } from 'vue';
import store from './store';
import router from './router';
import App from './App.vue';
import './plugins/vant';
import './plugins/element';
import directives from './directives/index';
import nprogress from './plugins/nprogress';
import 'uno.css';
const app = createApp(App);
directives(app); // 注册全局自定义指令
nprogress(router);

app.use(router);
app.use(store);
app.mount('#app');
