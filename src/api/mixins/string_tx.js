import {LANUAGESMIX} from "@/i18n"
import colorx from "@/api/mixins/mixin/colorx"
import {EventBus} from "vue-backgrounds"
import {getStoredItemStr} from "@/api/compress/urltool"
import BN from "bn.js"
import {shorten} from "vue-blocklink";

export default {
    mixins: [LANUAGESMIX, colorx],
    methods: {
        ChangeSkin(mode = 0) {
            if (mode === 0) {
                localStorage.setItem("skin", mode);
                console.log("skin:", localStorage.getItem("skin"));
            } else if (mode === 1) {
                localStorage.setItem("skin", mode);
                console.log("skin", localStorage.getItem("skin"));
            }
        },
        ChangeLanguage(lang = "") {
            if (lang === "") {
                if (this.$i18n.locale === "en") {
                    this.$i18n.locale = "zh"
                } else {
                    this.$i18n.locale = "en"
                }
            } else {
                this.$i18n.locale = lang
            }
            if (localStorage) {
                localStorage.setItem("lang", this.$i18n.locale)
            }
            const label = _.findLastIndex(this.languages, ["key", lang])
            this.notySuccess(`Changed Language to ${this.languages[label].label}`)
            EventBus.$emit("eventChangeLanguage", lang)
        },
        LanguageStart() {
            this.$i18n.locale = getStoredItemStr("lang", "en")
        },
        notyError(msg) {
            let message_final
            if (msg === undefined) {
                message_final = "unknown error"
            } else if (typeof (msg) === "string") {
                message_final = msg
            } else if (typeof (msg) === "object" && msg.hasOwnProperty("message")) {
                message_final = msg.message
            } else {
                message_final = "unknown error"
            }
            this.$notice({
                type: "error", // alert, success, warning, error, info/information
                text: message_final
            })
        },
        notySuccess(msg) {
            this.$notice({
                type: "success", // alert, success, warning, error, info/information
                text: msg
            })
        },
        notyWarning(msg) {
            this.$notice({
                type: "warning", // alert, success, warning, error, info/information
                text: msg
            })
        },
        notyInfo(msg) {
            this.$notice({
                type: "info", // alert, success, warning, error, info/information
                text: msg
            })
        },
        notyAlert(msg) {
            this.$notice({
                type: "alert", // alert, success, warning, error, info/information
                text: msg
            })
        },
        shortedHash(text) {
            return text.substring(0, 6) + "..." + text.substr(text.length - 5)
        },
        notificHashSigned(hash) {
            const text = `Signed Hash and Copied!\n${this.shortedHash(hash)}`
            const link = `${process.env.exploreruri}${hash}`
            this.$copyText(link).then((e) => {
                this.notySuccess(this.$t("n_copy"))
            }, function (ce) {
                this.notyError(ce)
            })
            this.notyInfo(text)
        },
        notificCopyReferral(hash) {
            const text = `Referrals Copy!\n${this.shortedHash(hash)}`
            const link = `${process.env.referraluri}${hash}`
            this.$copyText(link).then((e) => {
                this.notySuccess(this.$t("n_copy"))
            }, function (ce) {
                this.notyError(ce)
            })
            this.notyInfo(text)
        },
        toBn(anything) {
            return new BN(anything)
        },
        _ipfsUrl(hash) {
            return ""
        },
        _etherscanLink(hash) {
            return ""
        },
        _numeral(hash) {
            return ""
        },
        _shorten(a) {
            return shorten(a)
        },
    }
}
