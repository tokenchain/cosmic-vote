import namespaces from '@/namespaces.json';


export default {
    data() {
        return {
            key: ""
        }
    },
    computed: {
        namespace() {
            return namespaces[this.key]
                ? namespaces[this.key]
                : {token: this.key, verified: []};
        },
        namespaceraw() {
            try {
                return namespaces[this.key];
            } catch (e) {
                return {};
            }

        }
    },
    methods: {
        getNameSpaces() {
            return namespaces
        }
    }

}
