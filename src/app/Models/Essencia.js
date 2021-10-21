const mongoose = require('mongoose');

const Essencia = mongoose.Schema(
    {
        idx: {
            type: Number,
            require: true
        },
        name: {
            type: String,
            require: true,
        },
        brand: {
            type: String,
            require: true,
        },
        like: {
            type: Number,
            require: true,
        },
        dislike: {
            type: Number,
            require: true,
        },
        place: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        userCad: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        userVoto: {
            type: Array,
            require: false,
            'default': []
        },
        urlImg: {
            type: Object,
            require: false,
            'default': {}
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('essencia', Essencia);