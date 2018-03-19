module.exports = app => {
	const Sensor = app.db.models.Sensor;
	const Vaga = app.db.models.Vaga;

	Sensor.belongsTo(Vaga, {as: "Vaga",through: "Sensor_Vaga", foreignKey: "id_vaga"});

	app.route("/sensor")
		.all((req,res, next) => {
			delete req.body.id_sensor;
			next();
		});
	app.get("/sensor", (req, res) => {
			Sensor.findAll({include: [{all: true}]})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.post("/sensor", (req, res) => {
			Sensor.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/sensor/:id_sensor")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/sensor/:id_sensor", (req, res) => {
			Sensor.findOne({where: req.params},{
				include: [{model: Vaga, as: "Vaga"}]})
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
	app.put("/sensor/:id_sensor", (req, res) => {
					Sensor.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.delete("/sensor/:id_sensor", (req, res) => {
			Sensor.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}