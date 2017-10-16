module.exports = (sequelize, Sequelize) => {
	const Cliente = sequelize.define("Cliente", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		}, {

			classMethods: {
				associate: (models) => {
					Cliente.belongsTo(models.Usuario);
					Cliente.hasMany(models.Veiculo);
					Cliente.hasMany(models.Reserva);
				}
			}
		});
	return Cliente;
};