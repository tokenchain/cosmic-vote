import Vue from "vue"
import SlideOut from "@hyjiacan/vue-slideout"
import InputCode from "vue-codepin/src/components/codepin/Component"

import VueQrcode from "@chenfengyuan/vue-qrcode"

/* 使用px：import {RollNotice, RollNoticeItem} from 'vue-ydui/dist/lib.px/rollnotice'; */
Vue.component(InputCode.name, InputCode)
Vue.component(VueQrcode.name, VueQrcode)
