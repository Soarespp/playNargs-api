const Essencia = require('../Models/Essencia');


class EssenciaController {
    async get(req, res) {
        const essencias = await Essencia.find();
        return res.status(200).json({ essencias })
    }

    async update(req, res) {
        let essenciaExists = await Essencia.findOneAndReplace({ idx: req.body.idx }, { ...req.body }, { rawResult: true })

        if (!essenciaExists.lastErrorObject.updatedExisting) {
            return res.status(400).json({
                error: true,
                massage: "Update não deu certo"
            })
        } else {
            return res.status(200).json({
                error: false,
                massage: "Update Ok."
            })
        }
    }

    async delete(req, res) {
        let essenciaExists = await Essencia.findOne({ idx: req.body.idx });

        if (!essenciaExists) {
            return res.status(400).json({
                error: true,
                massage: "Essência n cadastrada"
            })
        }

        let resp = await Essencia.deleteOne({ idx: req.body.idx })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    massage: `Essência n cadastrado ${error}`
                })
            })

        if (resp.deletedCount > 0) {
            return res.status(200).json({
                error: false,
                massage: "Delete executado"
            })
        }
    }

    async store(req, res) {
        let essenciaExists = await Essencia.findOne({ name: req.body.name });

        if (essenciaExists) {
            return res.status(400).json({
                error: true,
                massage: "Essencia já cadastrada"
            })
        }

        const { idx, name, brand, like, dislike, place, description, userCad, type } = req.body;

        const data = { idx, name, brand, like, dislike, place, description, userCad, type };

        await Essencia.create(data, (err) => {
            if (err)
                return res.status(400).json({
                    error: true,
                    massage: "Erro ao tentar inserir essencia no banco MongoDB"
                })

            return res.status(200).json({
                error: false,
                massage: "essencia cadastrada com sucesso"
            })
        })
    }
}

module.exports = new EssenciaController();