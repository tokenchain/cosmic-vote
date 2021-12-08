// This code will be injected before initializing the root App
import Vue from "vue"
import Noty from "noty"
// all themes
// mint, sunset, relax, nest, metroui, semanticui, light, bootstrap-v3, bootstrap-v4
// the only available themes
// mint, relax, metroui,
const options = {
  layout: "topCenter",
  theme: "relax",
  timeout: 3000
}

const module = {
  install: (Vue, opts) => {
    Vue.prototype.$notice = function (data) {
      return new Noty(Object.assign(options, opts, data)).show()
    }
  }
}

// ------()--------------()------
Vue.use(module)
// ------()--------------()------
// ------()--------------()------
// Vue.use(module_toast_go)
// ------()--------------()------


const module_handling_error = {
  install: (Vue, opts) => {
    Vue.prototype.$handleErrorEvm = function (error) {
      if (error instanceof String) {
        console.log("==== error on this String ====")
        console.log(error)
      } else if (error instanceof Object) {
        //console.log("==== error on this Object ====")
        if (error.message) {
          this.failed_payment_message = error.message
          if (error.message.includes("invalid BigNumber value")) {
            this.failed_payment_message = "BigNumber format not correct."
          }
          if (error.message.includes("invalid address")) {
            this.failed_payment_message = "Input Address is not correct."
          }
        }
        if (error.toString().includes("execution reverted")) {
          if (error.toString().includes("xxxxx")) {
            this.failed_payment_message = "To explain more for this error"
          }
        }
      } else if (error.error) {
        if (error.error.includes("invalid BigNumber value")) {
          this.failed_payment_message = "BigNumber format not correct."
        }
      } else if (error === "USER_DENIED") {
        this.failed_payment_message = "User denied transaction."
      }
    }
  }
}

Vue.use(module_handling_error)
