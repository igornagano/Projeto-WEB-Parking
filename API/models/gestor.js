module.exports = (sequelize, Sequelize) => {
	const Gestor = sequelize.define("Gestor", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		}, {

			classMethods: {
				associate: (models) => {
					Gestor.belongsTo(models.Colaborador);
				}
			}
		});
	return Gestor;
};