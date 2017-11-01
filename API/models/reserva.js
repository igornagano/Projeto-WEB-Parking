module.exports = (sequelize, Sequelize) => {
	const Reserva = sequelize.define("Reserva", {
			id_reserva: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			situacao: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'A'
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
				type: Sequelize.DECIMAL(10,2),
				allowNull: false
			},
			pago: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'N',
				validate: {
					notEmpty: true
				}
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	
		
				
		
	return Reserva;
};