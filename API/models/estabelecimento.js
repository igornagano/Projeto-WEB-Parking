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
			},
			horario_inicio: {
				type: Sequelize.TIME
			},
			horario_fim: {
				type: Sequelize.TIME
			},
			situacao: {
				type: Sequelize.CHAR(1),
				allowNull: false,
				defaultValue: 'A'
			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Estabelecimento;
};