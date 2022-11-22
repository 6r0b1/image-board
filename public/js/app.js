import { imageModal } from "./imageModal.js";
import { comments } from "./comments.js";
import * as Vue from "./vue.js";

Vue.createApp({
    components: {
        "image-modal": imageModal,
        comments: comments,
    },
    data() {
        return {
            headline: "My fancy image board",
            headlineCss: "headlineClass",
            images: [],
            message: "",
            photo: "",
            title: "",
            id: "",
            description: "",
            username: "",
            firstName: "",
            url: "",
            count: 0,
            modal: false,
            modalID: "",
            modalURL: "",
            modalTitle: "",
            modalDescription: "",
        };
    },
    methods: {
        openModal: function (e) {
            let src = e.target.src;
            for (let i = 0; i < this.images.length; i++) {
                if (this.images[i].url === src) {
                    this.modalID = this.images[i].id;
                    this.modalURL = this.images[i].url;
                    this.modalTitle = this.images[i].title;
                    this.modalDescription = this.images[i].description;
                }
            }
            this.modal = true;
        },
        closeModal: function (e) {
            this.modal = false;
            console.log(this.modal);
        },
        uploadImage: function (e) {
            e.preventDefault();
            const upload = document.querySelector("#upload-form");
            const formData = new FormData(upload);
            fetch("/images", {
                method: "POST",
                body: formData,
            }).then(() => {
                fetch("/images")
                    .then((res) => res.json())
                    .then((images) => {
                        this.images = images;
                    });
            });
        },
        loadNext: function (e) {
            let lastImageID = this.images[this.images.length - 1].id;
            fetch(`next/${lastImageID}`)
                .then((res) => res.json())
                .then((images) => {
                    this.images = images;
                });
        },
        loadPrevious: function (e) {
            let firstImageID = this.images[0].id;
            fetch(`next/${firstImageID}`)
                .then((res) => res.json())
                .then((images) => {
                    this.images = images;
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
