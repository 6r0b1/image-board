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
            // display/hide modal
            modal: false,
            // give data to modal
            modalID: "",
            modalURL: "",
            modalTitle: "",
            modalDescription: "",
            // display/hide pagination
            prev: false,
            next: false,
            // prevent background scrolling on open modal
            preventScroll: "",
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
            this.modal = this.modalID;
            this.preventScroll = "prevent_scroll";
            history.pushState(null, "", `/image/${this.modalID}`);
        },
        closeModal: function (e) {
            this.modal = false;
            this.preventScroll = "";
            history.pushState(null, "", `/`);
        },
        uploadImage: function (e) {
            e.preventDefault();
            // get data from form & put in formdata to use in multi part stream
            const upload = document.querySelector("#upload-form");
            const formData = new FormData(upload);
            fetch("/images", {
                method: "POST",
                body: formData, // this to get formdata to server.js at post /images
            }).then(() => {
                fetch("/images")
                    .then((res) => res.json())
                    .then((images) => {
                        this.images = images;
                        // check if pagination should be shown
                        if (
                            images[images.length - 1].id !== images[0].lowestId
                        ) {
                            this.next = true;
                        }
                    });
            });
        },
        loadNext: function (e) {
            this.prev = true;
            let lastImageID = this.images[this.images.length - 1].id;
            fetch(`next/${lastImageID}`)
                .then((res) => res.json())
                .then((images) => {
                    if (images[images.length - 1].id === images[0].lowestId) {
                        this.next = false;
                    }
                    this.images = images;
                });
        },
        loadPrevious: function (e) {
            let firstImageID = this.images[0].id;
            console.log(firstImageID);
            fetch(`prev/${firstImageID}`)
                .then((res) => res.json())
                .then((images) => {
                    if (images[images.length - 1].id === images[0].highestId) {
                        this.prev = false;
                    }
                    this.images = images.reverse();
                    this.next = true;
                });
        },
    },
    created() {
        // listen to browser navigation
        window.addEventListener("popstate", function (e) {});
    },
    mounted() {
        fetch("/images")
            .then((res) => res.json())
            .then((images) => {
                this.images = images;
                if (images[images.length - 1].id !== images[0].lowestId) {
                    this.next = true;
                }
                console.log(location.pathname);
                // to open modal on request check pathname for ID, fetch image data by ID
                // set this.modalXY to image data and modal to the id
                history.pushState(null, "", `/`);
            });
    },
}).mount("#main");
