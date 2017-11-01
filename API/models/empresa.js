module.exports = (sequelize, Sequelize) => {
	const Empresa = sequelize.define("Empresa", {
			id_empresa: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			razao_social: {
				type: Sequelize.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			nome_fantasia: {
				type: Sequelize.STRING(100),
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			cnpj: {
				type: Sequelize.STRING(18),
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true
				}

			}
		},{
			timestamps: false, 
			freezeTableName: true
		});
	return Empresa;
};