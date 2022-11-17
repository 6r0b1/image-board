import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            headline: "My fancy image board",
            headlineCss: "headlineClass",
            images: [],
            firstName: "",
            count: 0,
        };
    },
    methods: {},
    mounted() {
        fetch("/images")
            .then((res) => res.json())
            .then((images) => {
                this.images = images;
            });
    },
}).mount("#results_galery");
