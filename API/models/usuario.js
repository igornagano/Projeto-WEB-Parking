//var bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define("Usuario", {
			id_usuario: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true
				}
			},
			senha: {
				type: Sequelize.STRING(255),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			nome: {
				type: Sequelize.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: true
				}

			},
			cpf: {
				type: Sequelize.STRING(14),
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true
				}
			},
			telefone: {
				type: Sequelize.STRING(12),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			situacao: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'A'
			}
		}, {
			timestamps: false,
			freezeTableName: true
		/*
			hooks: {
				beforeCreate: usuario => {
					const salt = bcryt.genSaltSync();
					Usuario.senha = bcryt.hashSync(Usuario.senha, salt);
				}
			},
			classMethods: {
				associate: (models) => {
					Usuario.hasMany(models.Cliente);
					Usuario.hasMany(models.Colaborador);
				},
				isPassword: (encodedPassword, senha) => {
					return bcryt.compareSync(senha, encodedPassword);
				}
			}*/
		});
	return Usuario;
};