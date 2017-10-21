module.exports = app => {
	const Sensor = app.db.models.Sensor;

	app.route("/sensor")
		.all((req,res, next) => {
			delete req.body.id_sensor;
			next();
		})
		.get((req, res) => {
			Sensor.findAll({})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Sensor.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/sensor/:id")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Sensor.findOne({where: req.params})
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
			Sensor.update(req.body, {where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Sensor.destroy({where: req.params})
				then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}