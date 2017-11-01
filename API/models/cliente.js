module.exports = (sequelize, Sequelize) => {
	const Cliente = sequelize.define("Cliente", {
			id_cliente: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Cliente;
};