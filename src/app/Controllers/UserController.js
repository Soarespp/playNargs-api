const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');


class UserController {
    async get(req, res) {
        const userFind = await User.find();

        console.log('get userFind', userFind)
        return res.status(200).json({ userFind })
    }

    async update(req, res) {
        let userExists = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.password }, { rawResult: true })

        if (!userExists.lastErrorObject.updatedExisting) {
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
        let userExists = await User.findOne({ email: req.body.email });

        if (!userExists) {
            return res.status(400).json({
                error: true,
                massage: "usuario n cadastrado"
            })
        }

        let resp = await User.deleteOne({ email: req.body.email })
            .catch((error) => {
                return res.status(400).json({
                    error: true,
                    massage: `usuario n cadastrado ${error}`
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

        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });


        let userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            return res.status(400).json({
                error: true,
                massage: "usuario ja existente"
            })
        }

        const { name, email, password } = req.body;

        const data = { name, email, password };

        data.password = await bcrypt.hash(data.password, 8);

        await User.create(data, (err) => {
            if (err)
                return res.status(400).json({
                    error: true,
                    massage: "Erro ao tentar inserir usuario no banco MongoDB"
                })

            return res.status(200).json({
                error: false,
                massage: "usuario cadastrado com sucesso"
            })
        })
    }
}

module.exports = new UserController();