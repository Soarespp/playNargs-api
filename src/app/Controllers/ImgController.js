const Img = require('../Models/Img')

class ImgController {
    async get(req, res) {
        const imgs = await Img.find();
        return res.status(200).json(imgs);
    }

    async getId(req, res) {
        const imgs = await Img.findById(req.params.id);
        return res.status(200).json(imgs);
    }

    async post(req, res) {
        const { originalname: name, size, key, location: url = "" } = req.file;

        const img = await Img.create({
            name,
            size,
            key,
            url
        });

        return res.status(200).json(img)
    }

    async del(req, res) {
        const img = await Img.findById(req.params.id);
        if (img) {
            await img.remove()
        }
        return res.status(200).json(img);
    }
}

module.exports = new ImgController();