module.exports = (sequelize, Sequelize) => {
	const Veiculo = sequelize.define("Veiculo", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			marca: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			modelo: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			ano: {
				type: Sequelize.CHAR,
				allowNull: false,
				validate: {
					notEmpty: true
				}

			},
			placa: {
				type: Sequelize.CHAR,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			}
		}, {

			classMethods: {
				associate: (models) => {
					Veiculo.belongsTo(models.Cliente);
					Veiculo.hasMany(models.Reserva);
				}
			}
		});
	return Veiculo;
};