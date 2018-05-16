module.exports = (sequelize, Sequelize) => {
	const Gestor = sequelize.define("Gestor", {
			id_gestor: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			proprietario:{
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'N'

			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Gestor;
};