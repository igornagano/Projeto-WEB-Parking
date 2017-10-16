module.exports = (sequelize, Sequelize) => {
	const Estabelecimento = sequelize.define("Estabelecimento", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			unidade: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			endereco: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			}
		}, {

			classMethods: {
				associate: (models) => {
					Estabelecimento.belongsTo(models.Empresa);
					Estabelecimento.hasMany(models.Vaga);
				}
			}
		});
	return Estabelecimento;
};