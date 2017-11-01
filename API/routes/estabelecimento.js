module.exports = app => {
	const Estabelecimento = app.db.models.Estabelecimento;
	const Empresa = app.db.models.Empresa;

	Estabelecimento.belongsTo(Empresa,  {as: "Empresa",through: "Estabelecimento_Empresa", foreignKey: "id_empresa"});

	app.route("/estabelecimento")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Estabelecimento.findAll({
				include: [{all: true}]
			})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Estabelecimento.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/estabelecimento/empresa/:id_empresa")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Estabelecimento.findAll({
				where: req.params,
				include: [{all: true}]
			})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})

	app.route("/estabelecimento/:id_estabelecimento")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Estabelecimento.findOne({where: req.params,
				include: [{model: Empresa, as: "Empresa"}]})
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
			Estabelecimento.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Estabelecimento.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}