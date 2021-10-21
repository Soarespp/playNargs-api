const Post = require('../Models/Post');

class PostController {
    async get(req, res) {
        const posts = await Post.find();
        return res.status(200).json(posts);
    }

    async getId(req, res) {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }

    async post(req, res) {
        const { originalname: name, size, key, location: url = "" } = req.file;

        const post = await Post.create({
            name,
            size,
            key,
            url
        });

        return res.status(200).json(post)
    }

    async del(req, res) {
        const post = await Post.findById(req.params.id);

        await post.remove();

        return res.send();
    }
}

module.exports = new PostController();