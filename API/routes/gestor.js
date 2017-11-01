
module.exports = app => {
	const Gestor = app.db.models.Gestor;
	const Colaborador = app.db.models.Colaborador;

	Gestor.belongsTo(Colaborador,  {as: "Colaborador",through: "Gestor_Colaborador", foreignKey: "id_colaborador"});

	app.route("/gestor")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Gestor.findAll({
				include: [{all: true}]
			})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Gestor.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/gestor/:id_gestor")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Gestor.findOne({where: req.params})
				.then(result => {
					if(result) {
						res.json(result);
					} else {
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.put((req, res) => {
			Gestor.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Gestor.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}