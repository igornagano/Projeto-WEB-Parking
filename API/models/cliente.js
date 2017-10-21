module.exports = (sequelize, Sequelize) => {
	const Cliente = sequelize.define("Cliente", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		});
	return Cliente;
};