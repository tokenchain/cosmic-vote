import VueMqtt from "vue-mqtt"
import Vue from "vue"

const mqoptions = { clientId: "WebClient-" + parseInt(Math.random() * 100000) }
Vue.use(VueMqtt, process.env.WS_URL, mqoptions)

const vmmqtt = new Vue({
  mqtt: {
    "login/result/+/" (val) {
      console.log("login/result/+/")
    },
    "user/+/serverhash/" (val) {
      console.log("server hash/#")
    },
    "user/+/clienthash/" (val) {
      console.log("client hash/#")
    },
    "user/+/play/" (val) {
      console.log("play/#")
    },
    "param/param/param/test" (val) {
      console.log("param/param/param/test")
    },
    "template/+" (data, topic) {
      if (topic.split("/").pop() === "12345") {
        console.log("topic:", "template/12345")
      }
    },
    "template/+/param/param" (data, topic) {
      if (topic.split("/")[1] === "12345") {
        console.log("topic:", "template/12345/param/param")
      }
    },
    ping (va) {
      console.log("ping")
    },
    pong (va) {
      console.log("pong")
    }
  },

  created () {
    const dat = this
    // this.$mqtt.subscribe ("provisioning/key/confirm/#")
    // this.$mqtt.subscribe ("provisioning/something/something/#")
    dat.$mqtt.subscribe("/ws")
    dat.$mqtt.on("error", function (error) {
      console.log("error: it is s", error.messages)
    })
    dat.$mqtt.on("message", function (topic, message) {
      console.log("message", message)
    })
    dat.$mqtt.on("connect", function () {
      console.log("Connected")
    })
    dat.$mqtt.on("close", function () {
      console.log("connection error or the server is stopped.")
    })
    setTimeout(function () {
      dat.$mqtt.publish("chat", "")
      dat.$mqtt.publish("ping", "")
      dat.$mqtt.publish("pong", "")
      console.log("chat is chat right now.")
    }, 1000)
  },
  mounted () {
    // console.log("on mount action is now started.")

  },
  methods: {
    clickSub (val) {
    },
    clickPub (val) {
      this.$mqtt.publish("param/param/param/test", val)
    }
  }
})

Object.defineProperty(console, "_commandLineAPI",
  {
    get () {
      throw "Do not try to do that!"
    }
  })
/*

with ((console && console._commandLineAPI) || {}) {
    console.error ("do not try..")
}

const disableDevtools = callback => {
    const original = Object.getPrototypeOf;

    Object.getPrototypeOf = (...args) => {
        if (Error().stack.includes("getCompletions")) callback();
        return original(...args);
    };
};

disableDevtools(() => {
    console.error("devtools has been disabled");

    while (1);
});
*/
