var bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define("Usuario", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			senha: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}

			},
			cpf: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			telefone: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			situacao: {
				type: Sequelize.CHAR,
				allowNull: false,
				defaultValue: '0'
			}
		}, {
			/*hooks: {
				beforeCreate: usuario => {
					const salt = bcryt.genSaltSync();
					Usuario.senha = bcryt.hashSync(Usuario.senha, salt);
				}
			},*/
			classMethods: {
				associate: (models) => {
					Usuario.hasOne(models.Cliente);
					Usuario.hasOne(models.Colaborador);
				}/*,
				isPassword: (encodedPassword, senha) => {
					return bcryt.compareSync(senha, encodedPassword);
				}*/
			}
		});
	return Usuario;
};