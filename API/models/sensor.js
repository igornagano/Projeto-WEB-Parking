module.exports = (sequelize, Sequelize) => {
	const Sensor = sequelize.define("Sensor", {
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
			Vaga_id_vaga: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, {

			classMethods: {
				associate: (models) => {
					Sensor.belongsTo(models.Vaga);
				}
			}
		});
	return Sensor;
};