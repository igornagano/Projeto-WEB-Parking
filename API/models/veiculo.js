module.exports = (sequelize, Sequelize) => {
	const Veiculo = sequelize.define("Veiculo", {
			id_veiculo: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			marca: {
				type: Sequelize.STRING(45),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			modelo: {
				type: Sequelize.STRING(45),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			ano: {
				type: Sequelize.CHAR(4),
				allowNull: false,
				validate: {
					notEmpty: true
				}

			},
			placa: {
				type: Sequelize.CHAR(7),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Veiculo;
};