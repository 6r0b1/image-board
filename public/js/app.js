// import addImages as addImages from "./db.js";
import * as Vue from "./vue.js";

const imageModal = {
    props: ["id", "url", "title", "description"],

    template: `<div class="modal">
            <div class="light-box">
                <div @click="$emit('closed')">
                close
            </div>
                <img v-bind:src="url" v-bind:id="id" alt="title"/>
                <h3>{{title}}</h3>
                <p>{{description}}</p>
            </div>
        </div>`,
};

Vue.createApp({
    components: {
        "image-modal": imageModal,
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
            })
                .then((res) => res.json())
                .then((result) => {
                    this.images.push(result);
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
