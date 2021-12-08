import autofocus from 'vue-autofocus-directive';
import infiniteScroll from 'vue-infinite-scroll';
import TextareaAutosize from 'vue-textarea-autosize';
import Jazzicon from 'vue-jazzicon'
import Vue from "vue";

Vue.use(infiniteScroll);
Vue.use(TextareaAutosize);
Vue.component('jazzicon', Jazzicon);
Vue.directive('autofocus', autofocus);
