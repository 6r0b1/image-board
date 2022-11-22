export { imageModal };

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
