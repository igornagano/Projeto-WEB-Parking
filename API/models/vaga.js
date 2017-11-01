module.exports = (sequelize, Sequelize) => {
	const Vaga = sequelize.define("Vaga", {
			id_vaga: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			setor: {
				type: Sequelize.CHAR(1),
				allowNull: false
			},
			numero: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			tipo: {
				type: Sequelize.CHAR(1),
				allowNull: false
			},
			situacao: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'L'
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Vaga;
};