export { comments };

const comments = {
    data() {
        return {
            comments: [],
        };
    },
    props: ["image_id"],
    methods: {
        postComment: function (e) {
            e.preventDefault();
            console.log(e.target[0].value);
            const form = e.currentTarget;
            // set up data to send with the fetch, get it from the form
            const body = {
                image_id: this.image_id,
                commenter: form.querySelector('[name="commenter"]').value,
                comment: form.querySelector('[name="comment"]').value,
            };
            // send to server with header application/json!
            fetch("/comments", {
                method: "post",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((newComment) => {
                    console.log(newComment);
                    this.comments.unshift(newComment);
                });
        },
    },
    mounted() {
        fetch(`images/${this.image_id}`)
            .then((res) => res.json())
            .then((comments) => {
                this.comments = comments;
                console.log(this.comments);
            });
    },
    template: `<div>
        <form @submit="postComment">
            <input class="input_text" type="text" name="commenter" placeholder="username" />
            <input class="input_text" type="text" name="comment" placeholder="Your Comment" />
            <button class="send_button" type="submit" >Comment</button>
        </form>
    </div>
    <div >
        <div class="comment" v-for="comment of comments">
            <p>User: {{comment.commenter}}</p>
            <p>Message: {{comment.comment}}</p>
        </div>
    </div>`,
};
