module.exports = (sequelize, Sequelize) => {
	const Valores = sequelize.define("Valores", {
			id_valores: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			valor: {
				type: Sequelize.DECIMAL(10,2),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			hora: {
				type: Sequelize.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Valores;
};