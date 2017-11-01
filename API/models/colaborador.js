module.exports = (sequelize, Sequelize) => {
	const Colaborador = sequelize.define("Colaborador", {
			id_colaborador: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Colaborador;
};