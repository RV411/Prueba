const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidoPaterno: {
        type: String,
        required: true,
    },
    apellidoMaterno: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        default: ''
    },
    calle: {
        type: String,
        required: '',
    },
    codigoPostal :{
        type: String,
        default: ''
    },
    ciudad: {
        type: String,
        default: ''
    },
    pais: {
        type: String,
        default: ''
    }
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;