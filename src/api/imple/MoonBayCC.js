import { EventBus } from "vue-backgrounds";
export class MoonBaycc {
    constructor() {
        this.heartbeatrate = 5000;
        this.blocklink = false;
        if (!this.heartbeat) {
            this.heartbeat = setInterval(() => {
                if (this.blocklink) {
                    if (this.callback_heartbeat) {
                        this.callback_heartbeat();
                    }
                    EventBus.$emit("heartbeat");
                }
            }, this.heartbeatrate);
            EventBus.$emit("heartbeat");
        }
        if (window && !window.hasOwnProperty("__moonBayLinker__")) {
            window.__moonBayLinker__ = this;
        }
    }
    setHbCustom(n) {
        this.heartbeatrate = n;
        return this;
    }
    setHbHightF() {
        this.heartbeatrate = 2000;
        return this;
    }
    setHbNormal() {
        this.heartbeatrate = 9000;
        return this;
    }
    setHbBatteryWise() {
        this.heartbeatrate = 20000;
        return this;
    }
    heart_beat(callback) {
        this.callback_heartbeat = callback;
        return this;
    }
    getLinkBase() {
        return this.blocklink;
    }
    linkBlockLink(instance) {
        this.blocklink = instance;
    }
    static Instance() {
        if (window && window.hasOwnProperty("__moonBayLinker__")) {
            const obj = window.__moonBayLinker__;
            if (obj instanceof MoonBaycc) {
                return (obj);
            }
            else {
                return (obj);
            }
        }
        else {
            return new MoonBaycc();
        }
    }
}
