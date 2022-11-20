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
            console.log("klick");
            const image = document.querySelector("input[type=file]").files[0];
            const formData = new FormData();

            formData.append("image", image);
            // formData.append("title", title);
            // formData.append("description", description);
            // formData.append("username", username);
            fetch("/images", {
                method: "POST",
                body: formData,
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
