const User = require('../models/user');

module.exports = {
  users: async function () {
    const users = await User.find();
    return {
      users: users.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },
  createUser: async function ({ userInput }) {
    const user = new User({
      nombre: userInput.nombre,
      apellidoPaterno: userInput.apellidoPaterno,
      apellidoMaterno: userInput.apellidoMaterno,
      telefono: userInput.telefono,
      calle: userInput.calle,
      codigoPostal: userInput.codigoPostal,
      ciudad: userInput.ciudad,
      pais: userInput.pais,
    });
    const createdUser = await user.save();
    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },
  updateUser: async function ({ id, userInput }) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('!USUARIO NO ENCONTRADO!');
    }
    user.nombre= userInput.nombre;
    user.apellidoPaterno= userInput.apellidoPaterno;
    user.apellidoMaterno= userInput.apellidoMaterno;
    user.telefono= userInput.telefono;
    user.calle= userInput.calle;
    user.codigoPostal= userInput.codigoPostal;
    user.ciudad= userInput.ciudad;
    user.pais= userInput.pais;
    const updatedUser = await user.save();
    return {
      ...updatedUser._doc,
      _id: updatedUser._id.toString(),
    };
  },
  deleteUser: async function ({ id }) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('!USUARIO NO ENCONTRADO!');
    }
    await User.findByIdAndRemove(id);
    return {
      ...user._doc,
      _id: user._id.toString(),
    };
  },
};
