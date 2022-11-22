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
            const body = {
                commenter: form.querySelector('[name="commenter"]').value,
                comment: form.querySelector('[name="comment"]').value,
            };
            fetch("/comments", {
                method: "post",
                body: { commenter: e.target[0].value },
            });
        },
    },
    mounted() {
        fetch(`/images/${this.image_id}`)
            .then((res) => res.json())
            .then((comments) => {
                this.comments = comments;
                console.log(this.comments);
            });
    },
    template: `<div>
        <form @submit="postComment">
            <input type="text" name="commenter" placeholder="username" />
            <input type="text" name="comment" placeholder="Your Comment" />
            <button type="submit" >Comment</button>
        </form>
    </div>
    <div v-for="comment of comments">
        <p>User: {{comment.commenter}}</p>
        <p>Message: {{comment.comment}}</p>
    </div>`,
};
