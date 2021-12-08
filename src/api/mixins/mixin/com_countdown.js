import txt from "@/api/mixins/string_tx"
import { EventBus } from "vue-backgrounds"
import { CountDown } from "vue-blocklink"

export default {
    mixins: [txt],
    data() {
        return {
            countdown_h: -1,
            countdown_m: -1,
            countdown_s: -1,
            countdown_purchase_seconds: 0,
            module_cd_purchase: false,
            module_cd_draw: false,
            event_lock: false,
            cd_progress_purchase: 0,
            cd_progress_round_draw: 0,
            failed_payment_message: "",
            end_time_stamp: 0,
            end_game_stamp: 0,
            length_t1: 0,
            length_t2: 0
        }
    },
    created() {
        //EventBus.$on("dataUpdate", this.nowInstall)
    },
    beforeDestroy() {
       // EventBus.$off("dataUpdate", this.nowInstall)
    },
    methods: {
        nowInstall() {
            const v = parseInt(this.$store.getters["b/ticket_end_purchase"])
            const w = parseInt(this.$store.getters["b/ticket_end_draw"])
            const s = parseInt(this.$store.getters["b/ticket_open_time"])
            if (this.end_time_stamp !== v) {
                this.end_time_stamp = v
                this.module_cd_purchase = new CountDown(v, this.updatez_countdown, this.updatecomplete_countdown)
                this.length_t1 = v - s
            }
            if (this.end_game_stamp !== w) {
                this.end_game_stamp = w
                this.module_cd_draw = new CountDown(w, this.updatez_countdown2, this.updatecomplete_countdown2)
                this.length_t1 = w - s
            }
            this.afterClockDefined()
        },
        afterClockDefined() {

        },
        updatez_countdown2(f) {
            const cd = (parseFloat(this.length_t2) - parseFloat(f.remain_seconds)) / parseFloat(this.length_t2) * 100.00
            this.cd_progress_round_draw = Math.floor(cd)
        },
        updatecomplete_countdown2() {
            this.cd_progress_round_draw = 100
            EventBus.$emit("draw_now")
        },
        updatez_countdown(f) {
            this.countdown_h = f.hours
            this.countdown_m = f.minutes
            this.countdown_s = f.seconds
            const cd = (parseFloat(this.length_t1) - parseFloat(f.remain_seconds)) / parseFloat(this.length_t1) * 100.00
            this.cd_progress_purchase = Math.floor(cd)
            this.countdown_purchase_seconds = parseInt(f.remain_seconds)
        },
        updatecomplete_countdown() {
            this.countdown_h = 0
            this.countdown_m = 0
            this.countdown_s = 0
            this.cd_progress_purchase = 100
            EventBus.$emit("close_ticket_now")
        }
    }

}
