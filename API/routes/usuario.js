module.exports = app => {

	const Usuario = app.db.models.Usuario;

	app.get("/usuario/:id", (req, res) => {
		Usuario.findById(req.params.id, {
			attributes: ["id", "nome", "email", "cpf", "situacao", "telefone"]
		})
			.then(result => res.json(result))
			.catch(error => {
				res.status(412).json({msg: error.message});
		});
	});

	app.delete("/usuario/:id", (req, res) => {
		Usuario.destroy({where: {id: req.params.id} })
			.then(result => res.sendStatus(204))
			.catch(error => {
				res.status(412).json({msg: error.message});
		});
	});

	app.post("/usuario", (req, res) => {
		Usuario.create(req.body)
			.then(result=> res.json(result))
			.catch(error => {
			res.status(412).json({msg: error.message});
		});
	});
}