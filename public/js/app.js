// import addImages as addImages from "./db.js";
import * as Vue from "./vue.js";

Vue.createApp({
    data() {
        return {
            headline: "My fancy image board",
            headlineCss: "headlineClass",
            images: [],
            message: "",
            photo: "",
            title: "",
            description: "",
            username: "",
            firstName: "",
            count: 0,
        };
    },
    methods: {
        uploadImage: function (e) {
            e.preventDefault();
            const upload = document.querySelector("#upload-form");
            const formData = new FormData(upload);
            fetch("/images", {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((result) => {
                    this.images.unshift(result);
                });
        },
    },
    mounted() {
        fetch("/images")
            .then((res) => res.json())
            .then((images) => {
                this.images = images;
            });
    },
}).mount("#main");
