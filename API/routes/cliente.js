module.exports = app => {
	const Cliente = app.db.models.Cliente;

	app.route("/cliente")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Cliente.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Cliente.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/cliente/:id")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Cliente.findOne({where: req.params})
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
			Cliente.update(req.body, {where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Cliente.destroy({where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}