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
    <div class="light-box">
        <div @click="$emit('closed')">close</div>
        <img v-bind:src="url" v-bind:id="id" alt="title" />
        <h3>{{title}}</h3>
        <p>{{description}}</p>
        <comments v-bind:image_id="id"></comments>
    </div>
    
</div>
`,
};
