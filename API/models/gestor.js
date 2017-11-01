module.exports = (sequelize, Sequelize) => {
	const Gestor = sequelize.define("Gestor", {
			id_gestor: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Gestor;
};