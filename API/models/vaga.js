module.exports = (sequelize, Sequelize) => {
	const Vaga = sequelize.define("Vaga", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			setor: {
				type: Sequelize.CHAR,
				allowNull: false
			},
			numero: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			tipo: {
				type: Sequelize.CHAR,
				allowNull: false
			},
			situacao: {
				type: Sequelize.CHAR,
				allowNull: false,
				defaultValue: '0'
			},
			Estabelecimento_id_estabelecimento: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, {

			classMethods: {
				associate: (models) => {
					Vaga.belongsTo(models.Estabelecimento);
					Vaga.hasOne(models.Sensor);
				}
			}
		});
	return Vaga;
};