module.exports = (sequelize, Sequelize) => {
	const Estabelecimento = sequelize.define("Estabelecimento", {
			id_estabelecimento: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			unidade: {
				type: Sequelize.STRING(45),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			endereco: {
				type: Sequelize.STRING(100)
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Estabelecimento;
};