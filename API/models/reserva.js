module.exports = (sequelize, Sequelize) => {
	const Reserva = sequelize.define("Reserva", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			situacao: {
				type: Sequelize.CHAR,
				allowNull: false,
				defaultValue: '0'
			},
			hora_entrada: {
				type: Sequelize.TIME,
				allowNull: true
			},
			hora_saida: {
				type: Sequelize.TIME,
				allowNull: true

			},
			data_efetuada: {
				type: Sequelize.DATE,
				allowNull: false
			},
			hora_marcada: {
				type: Sequelize.TIME,
				allowNull: false
			},
			tempo_atraso: {
				type: Sequelize.TIME,
				allowNull: false
			},
			preco: {
				type: Sequelize.DECIMAL,
				allowNull: false
			},
			pago: {
				type: Sequelize.CHAR,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			}
		});
	
		Reserva.associate = function (models) {
			Reserva.belongsTo(models.Cliente);
			Reserva.belongsTo(models.Veiculo);
			Reserva.belongsTo(models.Vaga);

		};
				
		
	return Reserva;
};