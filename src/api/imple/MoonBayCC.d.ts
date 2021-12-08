import { BlockWrap } from "vue-blocklink";
export declare class MoonBaycc {
    heartbeat: number;
    heartbeatrate: number;
    callback_heartbeat: Function;
    blocklink: BlockWrap | boolean;
    constructor();
    setHbCustom(n: number): MoonBaycc;
    setHbHightF(): MoonBaycc;
    setHbNormal(): MoonBaycc;
    setHbBatteryWise(): MoonBaycc;
    heart_beat(callback: any): MoonBaycc;
    getLinkBase(): BlockWrap;
    private linkBlockLink;
    static Instance(): (MoonBaycc | any | boolean);
}
