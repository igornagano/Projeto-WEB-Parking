module.exports = app => {
	const Empresa = app.db.models.Empresa;

	app.route("/empresa")
		.all((app.auth.authenticate()) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Empresa.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Empresa.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/empresa/:id")
		.all((app.auth.authenticate()) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Empresa.findOne({where: req.params})
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
			Empresa.update(req.body, {where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Empresa.destroy({where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}