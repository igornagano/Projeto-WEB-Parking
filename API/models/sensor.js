module.exports = (sequelize, Sequelize) => {
	const Sensor = sequelize.define("Sensor", {
			id_sensor: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			situacao: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'L'
			},
			tempo_resposta: {
				type: Sequelize.STRING(45)
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Sensor;
};