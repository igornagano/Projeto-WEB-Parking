module.exports = app => {
	const Reserva = app.db.models.Reserva;
	const Cliente = app.db.models.Cliente;
	const Vaga = app.db.models.Vaga;
	const Veiculo = app.db.models.Veiculo;
	const Estabelecimento = app.db.models.Estabelecimento;

	Reserva.belongsTo(Cliente, {as: "Cliente",through: "Reserva_Cliente", foreignKey: "id_cliente"});
	Reserva.belongsTo(Veiculo, {as: "Veiculo",through: "Reserva_Veiculo", foreignKey: "id_veiculo"});
	Reserva.belongsTo(Estabelecimento, {as: "Estabelecimento",through: "Reserva_Estabelecimento", foreignKey: "id_estabelecimento"});


	app.route("/reserva")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
	app.get("/reserva", (req, res) => {
			Reserva.findAll({include:[{all: true}]})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.post("/reserva", (req, res) => {
			Reserva.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/reserva/:id_reserva")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/reserva/:id_reserva", (req, res) => {
			Reserva.findOne({where: req.params,
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

	app.get("/reserva/cliente/:id_cliente", (req, res) => {
			Reserva.findAll({where: req.params,
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

	app.get("/reserva/estabelecimento/:id_estabelecimento", (req, res) => {
			Reserva.findAll({where: req.params,
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
	app.put("/reserva/:id_reserva", (req, res) => {
			Reserva.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.delete("/reserva/:id_reserva", (req, res) => {
			Reserva.update({situacao: "D"},{where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}