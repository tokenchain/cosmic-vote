export default {
    computed: {
        userRegistered() {
            return this.$store.getters["b/registered_user"]
        },
        getRound() {
            return this.$store.getters["b/get_round"]
        },
        fundEventStarted() {
            return this.$store.getters["b/canVegas"]
        },
        freeezeTime() {
            return this.$store.getters["b/_freeeze_time"]
        }
    },
}
