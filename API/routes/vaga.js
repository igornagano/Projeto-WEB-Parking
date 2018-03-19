module.exports = app => {
	const Vaga = app.db.models.Vaga;
	const Sensor = app.db.models.Sensor;
	const Estabelecimento = app.db.models.Estabelecimento;

	Vaga.belongsTo(Estabelecimento,   {as: "Estabelecimento",through: "Vaga_Estabelecimento", foreignKey: "id_estabelecimento"});
	Vaga.hasOne(Sensor, {as: "Sensor",through: "Sensor_Vaga", foreignKey: "id_vaga"});

	app.route("/vaga")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
	app.get("/vaga", (req, res) => {
			Vaga.findAll({include: [{all:true}]})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.post("/vaga", (req, res) => {
			Vaga.create({
				setor: req.body.setor,
				numero: req.body.numero,
				tipo: req.body.tipo,
				id_estabelecimento: req.body.id_estabelecimento
			})
				.then(Vagas => {
							return Vagas.createSensor({
								"tempo_resposta": req.body.tempo_resposta
							})
							.then(result=> res.json(result))
							.catch(error => {
							res.status(412).json({msg: error.message});
					});
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.route("/vaga/estabelecimento/:id_estabelecimento")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
	app.get("/vaga/estabelecimento/:id_estabelecimento", (req, res) => {
			Vaga.findAll({where: req.params,
				include: [{model: Estabelecimento, as: "Estabelecimento"},{model: Sensor, as: "Sensor"}]})
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
	app.route("/vaga/:id_vaga")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/vaga/:id_vaga", (req, res) => {
			Vaga.findOne({where: req.params,
				include: [{model: Estabelecimento, as: "Estabelecimento"},{model: Sensor, as: "Sensor"}]})
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
	app.put("/vaga/:id_vaga", (req, res) => {
			Vaga.update({
				setor: req.body.setor,
				numero: req.body.numero,
				tipo: req.body.tipo
			}, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
				Vaga.findOne({where: req.params})
				.then(Vagas => {
					Sensor.update({tempo_resposta: req.body.tempo_resposta}, {where: {id_vaga: Vagas.id_vaga} })
					.then(result => res.sendStatus(204))
					.catch(error => {
						res.status(412).json({msg: error.message});
					});

				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});

		});
	app.delete("/vaga/:id_vaga", (req, res) => {
			Vaga.update({
				situacao: "O"
			},{where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}