module.exports = app => {

	

	
	const Usuario = app.db.models.Usuario;
    const Cliente = app.db.models.Cliente;

    Usuario.hasOne(Cliente, {as: "Clientes",through: "Cliente_Usuario", foreignKey: "id_usuario"});
	Cliente.belongsTo(Usuario, { as:"Usuarios",through: "Cliente_Usuario",foreignKey: "id_usuario"});
	
	app.route("/cliente")
		.all((req,res, next) => {
			delete req.body.id_cliente;
			next();
		});
	app.get("/cliente", (req, res) => {
			Cliente.findAll({
				include: [{all: true}]})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.post("/cliente", (req, res) => {
			Usuario.create(req.body)
				.then(usuarios => {
					return usuarios.createClientes({})
					.then(result=> res.json(result))
					.catch(error => {
					res.status(412).json({msg: error.message});
		});
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		
			
			
		});
	app.route("/cliente/usuario/:email")
		.all((req, res, next) => {
			delete req.body.id_cliente;
			next();
		});
	app.get("/cliente/usuario/:email", (req, res) => {
			Usuario.findOne({where: req.params,
				include: [{model: Cliente, as: "Clientes"}]}
			)
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
		
	app.route("/cliente/:id_cliente")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/cliente/:id_cliente", (req, res) => {
			Cliente.findOne({where: req.params,
			include: [{model: Usuario, as: "Usuarios"}]})
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
	app.put("/cliente/:id_cliente", (req, res) => {
			Cliente.findOne({where: req.params,
			include: [{model: Usuario, as: "Usuarios"}]})
			.then(clientes=> {
				Usuario.update({
					nome: req.body.nome,
					telefone: req.body.telefone,
					cpf: req.body.cpf
				}, {where: {id_usuario: clientes.Usuarios.id_usuario}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
			})
			.catch(error => {
				res.status(412).json({msg: error.message});
			});
		});
	app.delete("/cliente/:id_cliente", (req, res) => {
			Cliente.findOne({where: req.params,
			include: [{model: Usuario, as: "Usuarios"}]})
			.then(clientes=> {
				console.log(req.params);
				Usuario.update({
					situacao: "I"
				}, {where: {id_usuario: clientes.Usuarios.id_usuario}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
			})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
}