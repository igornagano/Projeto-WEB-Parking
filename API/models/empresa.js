module.exports = (sequelize, Sequelize) => {
	const Empresa = sequelize.define("Empresa", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			razao_social: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			nome_fantasia: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			cnpj: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}

			}
		}, {

			classMethods: {
				associate: (models) => {
					Empresa.hasMany(models.Estabelecimento);
					Empresa.hasMany(models.Colaborador);
				}
			}
		});
	return Empresa;
};