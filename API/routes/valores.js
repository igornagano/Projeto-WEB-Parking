module.exports = app => {
	const Valores = app.db.models.Valores;
	
	const Estabelecimento = app.db.models.Estabelecimento;

	Valores.belongsTo(Estabelecimento, {as: "Estabelecimento",through: "Valores_Estabelecimento", foreignKey: "id_estabelecimento"});


	app.route("/valores")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
	app.get("/valores", (req, res) => {
			Valores.findAll({include:[{all: true}]})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.post("/valores", (req, res) => {
			Valores.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/valores/:id_valores")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/valores/:id_valores", (req, res) => {
			Valores.findOne({where: req.params,
				include: [{all: true}]})
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


	app.get("/valores/estabelecimento/:id_estabelecimento", (req, res) => {
			Valores.findAll({where: req.params,
				include: [{all: true}]})
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
	app.put("/valores/:id_valores", (req, res) => {
			Valores.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.delete("/valores/:id_valores", (req, res) => {
			Valores.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
			});
}