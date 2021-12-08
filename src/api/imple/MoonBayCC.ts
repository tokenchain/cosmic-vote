// @ts-ignore
import { EventBus } from "vue-backgrounds"
import { BlockWrap } from "vue-blocklink"

export class MoonBaycc {
    heartbeat: number;
    heartbeatrate: number = 5000;
    callback_heartbeat: Function;
    blocklink: BlockWrap | boolean = false;

    constructor() {
      if (!this.heartbeat) {
        // @ts-ignore
        this.heartbeat = setInterval(() => {
          if (this.blocklink) {
            if (this.callback_heartbeat) {
              this.callback_heartbeat()
            }
            EventBus.$emit("heartbeat")
          }
        }, this.heartbeatrate)
        EventBus.$emit("heartbeat")
      }
      if (window && !window.hasOwnProperty("__moonBayLinker__")) {
        // @ts-ignore
        window.__moonBayLinker__ = this
      }
    }

    setHbCustom(n: number): MoonBaycc {
      this.heartbeatrate = n
      return this
    }

    setHbHightF(): MoonBaycc {
      this.heartbeatrate = 2000
      return this
    }

    setHbNormal(): MoonBaycc {
      this.heartbeatrate = 9000
      return this
    }

    setHbBatteryWise(): MoonBaycc {
      this.heartbeatrate = 20000
      return this
    }

    heart_beat(callback): MoonBaycc {
      this.callback_heartbeat = callback
      return this
    }

    getLinkBase(): BlockWrap {
      return this.blocklink as BlockWrap
    }

    private linkBlockLink(instance: BlockWrap) {
      this.blocklink = instance
    }

    public static Instance(): (MoonBaycc | any | boolean) {
      if (window && window.hasOwnProperty("__moonBayLinker__")) {
        // @ts-ignore
        const obj = window.__moonBayLinker__
        if (obj instanceof MoonBaycc) {
          return (obj) as MoonBaycc
        } else {
          return (obj) as MoonBaycc
        }
      } else {
        return new MoonBaycc()
      }
    }
}
