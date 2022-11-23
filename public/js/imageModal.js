export { imageModal };
import { comments } from "./comments.js";

const imageModal = {
    components: {
        comments: comments,
    },
    data() {
        return {
            comments: [],
        };
    },
    props: ["id", "url", "title", "description"],
    template: `
<div class="modal">
    <div class="lightbox">
        <img class="close_button" src="./close.png" @click="$emit('closed')">
        <div class="overflow">
        <img class="lightbox_image" v-bind:src="url" v-bind:id="id" alt="title" />
        <h3>{{title}}</h3>
        <p class="description">{{description}}</p>
        <comments v-bind:image_id="id"></comments>
        </div>
    </div>
    
</div>
`,
};
