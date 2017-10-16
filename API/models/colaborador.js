module.exports = (sequelize, Sequelize) => {
	const Colaborador = sequelize.define("Colaborador", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			}
		}, {

			classMethods: {
				associate: (models) => {
					Colaborador.belongsTo(models.Usuario);
					Colaborador.belongsTo(models.Empresa);
					Colaborador.hasMany(models.Gestor);
				}
			}
		});
	return Colaborador;
};