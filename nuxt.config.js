/* eslint-disable */
const webpack = require("webpack")
//const path = require("path")
const js = require("./package.json")
const version = js.version
const domain_target = js.extensions.production_domain
const nodeExternals = require("webpack-node-externals")
const {LANUAGES} = require("./src/i18n")
//"src/pages/index_ethcap.vue"
//const SpritePlugin = require("svg-sprite-loader/plugin");

module.exports = {
    env: {
        baseUrl: process.env.BASE_URL || "http://localhost:3000",
        domain: js.extensions.stage_domain,
        version: version,
        network: js.extensions.node_using,
        chainid: js.extensions.chainID,
        exploreruri: js.extensions.explorertx,
        ipfs_node: js.extensions.ipfs_node,
        doc: js.extensions.documentation,
        telegram_chat: js.extensions.telegram_chat,
        telegram_channel: js.extensions.telegram_channel,
        twittermessage: js.extensions.twit
    },
    ssr: false,
    srcDir: "src/",
    head: {
        // title : "ETH CAPITAL",
        title: js.extensions.title,
        meta: [
            {charset: "utf-8"},
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: js.extensions.desc
            }
        ],
        link: [
            //{ rel : "icon", type : "image/x-icon", href : "/building.ico" }
            {
                rel: "icon",
                type: "image/x-icon",
                href: js.extensions.app_icon
            }
        ]
    },
    plugins: [{
        src: "~/plugins/backgrounds",
        ssr: false
    }, {
        src: "~/plugins/clipboard",
        ssr: false
    }, {
        src: "~/plugins/vue-notifications",
        ssr: false
    }, {
        src: "~/plugins/gsap",
        ssr: false
    }, {
        src: "~/plugins/filters",
        ssr: false
    }],
    css: ["./assets/styles/init"],
    modules: [
        "@nuxtjs/router",
        //"@nuxtjs/axios"
        ["nuxt-i18n", {
            locales: LANUAGES.LIST,
            defaultLocale: "en",
            vueI18n: {
                fallbackLocale: "en",
                messages: LANUAGES.SOURCE
            }
        }],
        ["@nuxtjs/vuetify", {
            icons: {
                iconfont: 'mdi',
            },
            customVariables: ["~/assets/styles/patch/_fixvuetify.scss"],
        }]
    ],
    router: {
        /**
         * custom entry of the app
         * @param routes
         * @param resolve
         */
        extendRoutes(routes, resolve) {
            let index = routes.findIndex(route => route.name === "index")
            routes[index] = {
                ...routes[index],
                component: resolve(__dirname, js.extensions.compile),
            }
            // console.log(routes[index]);
        }
    },
    /*
    vuetify: {
        customVariables: ["~/assets/styles/patch/_fixvuetify.scss"],
        treeShake: true,
        defaultAssets: {
            font: {},
            icons: "mdi"
        }
    },*/

    axios: {
        //proxy : true,
    },
    proxyTable: [
        "/api/shxconfirm", {
            target: domain_target,
            ws: true,
            // pathRewrite : { "^/api" : "/" }
        }
    ],
    build: {
        publicPath: "_balincer_ui_",
        filenames: {
            app: "[name].[hash].js",
        },
        analyze: {
            analyzerMode: "static",
            generateStatsFile: false,
            statsFilename: "stats.json",
            openAnalyzer: false
        },
        plugins: [
            new webpack.ProvidePlugin({
                "$": "jquery",
                "_": "lodash"
            }),
            /*
             new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              generateStatsFile: true,
              openAnalyzer: false,
              logLevel: 'info'
            })
            */
            new webpack.DefinePlugin({
                "process.VERSION": version,
                "process.WS_URL": wsGet(),
                "process.DOMAIN": domain_target
            }),
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
                automaticNameDelimiter: ".",
                name: true,
                cacheGroups: {},
                minSize: 10000,
                maxSize: 100000
            }
        },
        maxChunkSize: 100000,
        extend(config, {isDev, Client, isServer}) {
            // Extends Webpack Configuration
            // Add typescript extension to resolve list
            config.resolve.extensions.push("ts", "tsx")
            // Add rule for typescript loader
            config.module.rules.push({
                test: /\.(tsx?|ts)$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    //limit: 1000,
                    //name: !isDev ? '[name].[chunkhash].js' : '[name].[hash].js',
                    //filenames: '[name].[contenthash:7].[ext]',
                    //name: '[name].[contenthash:7].[ext]'
                    //filenames: {
                    // chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
                    // }
                }
            })
            if (isDev && Client) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/,
                    options: {
                        limit: 1000, // 1 KO
                        //name: !isDev ? '[name].[chunkhash].js' : '[name].[hash].js',
                        //filenames: '[name].[contenthash:7].[ext]'
                        filenames: {
                            chunk: ({isDev}) => (isDev ? "[name].js" : "[id].[contenthash].js")
                        }
                    }
                })
            }
            /*   const vueLoader = config.module.rules.find ((loader) => loader.loader === "vue-loader")
               vueLoader.options.transformToRequire = {
                 audio : "src"
               };
               */
            /*const vueLoader = config.module.rules.find ((loader) => loader.loader === "vue-loader")
                vueLoader.options.transformToRequire = {
                        audio : "src"
                    }*/
            /* config.module.rules.delete("images");
             config.module.rules.push ({
               test : /\.(png|jpe?g|gif|jpg|webp)$/,
               loader : "file-loader",
               exclude : /(assets\/svg)/,
               include : [
                 path.resolve (__dirname, "assets/img"),
                 path.resolve (__dirname, "static/textures"),
               ],
               options : {
                 limit : 4096, // 1KB
                 name : "img/[name].[hash:7].[ext]",
               },
             });
       */

            /* config.module.rules.push ({
               test : /\.(mp3)(\?.*)?$/,
               loader : "file-loader",
               include : [
                 path.resolve (__dirname, "static/media"),
               ],
             });*/

            /*
             config.module.rules.push ({
               test : /\.mp3$/,
               loader : "url-loader",
               options : {
                 limit : 10000,
                 name : utils.assetsPath ("audio/[name].[hash:7].[ext]")
               }
             });
             */

            /* config.module.rules.push ({
               test : /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
               use : {
                 loader : "url-loader",
                 options : {
                   limit : 1000, //bytes
                   name : "[hash:7].[ext]",
                   outputPath : "assets"
                 }
               }
             });*/
            /*  config.module.rules.push ({
                test : /\.svg$/,
                include : [
                  path.resolve (__dirname, "assets/svg"),
                ],
                use : "svg-sprite-loader",
              });*/

            if (isServer) {
                config.externals = [
                    nodeExternals({
                        allowlist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-echarts/]
                    })
                ]
            }
            /*if (Client) {
              const vendor = config.entry.vendor;
              // vendor2 is separated vendor file
              const vendor2 = [
                "web3",
                "clipboard"
                // and what ever you want
              ];
              // remove from existing vendor
              config.entry.vendor = vendor.filter (x => !vendor2.includes (x));
              config.entry.vendor2 = vendor2
            }*/
        }
    },
    babel: {
        presets() {
            return [
                [
                    "@nuxt/babel-preset-app",
                    {
                        corejs: {
                            version: 3,
                        },
                    },
                ],
            ]
        }
    },
    // buildModules: ["@nuxt/typescript-build"],
    /*
    ** Customize the progress-bar color
    */
    loading: {color: "#ffe56f"},
    loadingIndicator: "~/loadindicator.html"
}
