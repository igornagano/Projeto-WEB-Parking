module.exports = app => {
	const Vaga = app.db.models.Vaga;

	app.route("/vaga")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Vaga.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Vaga.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/vaga/:id")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Vaga.findOne({where: req.params})
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
			Vaga.update(req.body, {where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Vaga.destroy({where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}