module.exports = app => {
	const Veiculo = app.db.models.Veiculo;
	const Cliente = app.db.models.Cliente;

	Veiculo.belongsTo(Cliente,  {as: "Cliente",through: "Veiculo_Cliente", foreignKey: "id_cliente"});


	app.route("/veiculo")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Veiculo.findAll({
				include: [{all:true}]})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Veiculo.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.route("/veiculo/cliente/:id_cliente")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Veiculo.findAll({where: req.params, 
				include: [{model: Cliente, as: "Cliente"}]
			})
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
	app.route("/veiculo/:id_veiculo")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Veiculo.findOne({where: req.params, 
				include: [{model: Cliente, as: "Cliente"}]
			})
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
			Veiculo.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Veiculo.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}