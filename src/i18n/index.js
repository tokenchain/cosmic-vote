const SOURCE = Object.freeze({
  zh: require("./lang/_zh.json"), // 中文语言包
  cn: require("./lang/_cn.json"), // 中文语言包
  in: require("./lang/_in.json"), // Indian语言包
  ko: require("./lang/_kr.json"), // Ko语言包
  th: require("./lang/_th.json"), // Thai语言包
  jp: require("./lang/_jp.json"), // Japan语言包
  en: require("./lang/_en.json"),
  ru: require("./lang/_ru.json"),
  de: require("./lang/_de.json"),
  es: require("./lang/_es.json"),
  it: require("./lang/_it.json"),
  ar: require("./lang/_ar.json"),
  fr: require("./lang/_fr.json")
})
const DETAILS = Object.freeze([
  {
    source: require("./lang/_en.json"),
    key: "en",
    label: "🇺🇸 English"
  },
  {
    source: require("./lang/_ru.json"),
    key: "ru",
    label: "🇷🇺 русский"
  },
  {
    source: require("./lang/_ar.json"),
    key: "ar",
    label: "🇦🇪 Arabic"
  },
  {
    source: require("./lang/_cn.json"),
    key: "cn",
    label: "🇨🇳 中文语言"
  },
  {
    source: require("./lang/_zh.json"),
    key: "zh",
    label: "🇲🇴 中文語言"
  },
  {
    source: require("./lang/_kr.json"),
    key: "ko",
    label: "🇰🇷 한국어"
  },
  {
    source: require("./lang/_de.json"),
    key: "de",
    label: "🇩🇪 Deutsche"
  },
  {
    source: require("./lang/_th.json"),
    key: "th",
    label: "🇹🇭 ภาษาไทย"
  },
  {
    source: require("./lang/_jp.json"),
    key: "jp",
    label: "🇯🇵 日本語"
  },
  {
    source: require("./lang/_in.json"),
    key: "in",
    label: "🇮🇳 भारतीय"
  },
  {
    source: require("./lang/_fr.json"),
    key: "fr",
    label: "🇫🇷 Français"
  },
  {
    source: require("./lang/_es.json"),
    key: "es",
    label: "🇪🇸 Español"
  },
  {
    source: require("./lang/_it.json"),
    key: "it",
    label: "🇮🇹 Italiano"
  }
])
const LIST = Object.keys(SOURCE)

export const LANUAGES = Object.freeze({
  SOURCE,
  DETAILS,
  LIST
})

export const LANUAGESMIX = {
  created() {
    this.languages = DETAILS
  }
}
