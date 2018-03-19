module.exports = app => {
	const Empresa = app.db.models.Empresa;

	app.route("/empresa")
		.all((req, res, next) => {
			delete req.body.id_empresa;
			next();
		});
	app.get("/empresa", (req, res) => {
			Empresa.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.post("/empresa", (req, res) => {
			console.log(req.body);
			Empresa.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.get("/empresa/:id_empresa", (req, res) => {
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
		});
	app.put("/empresa/:id_empresa", (req, res) => {
			Empresa.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.delete("/empresa/:id_empresa", (req, res) => {
			Empresa.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}