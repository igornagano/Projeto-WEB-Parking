module.exports = app => {
	
	const Usuario = app.db.models.Usuario;
    const Cliente = app.db.models.Cliente;

    Usuario.hasOne(Cliente, {as: "Clientes",through: "Cliente_Usuario", foreignKey: "id_usuario"});
	Cliente.belongsTo(Usuario, { as:"Usuarios",through: "Cliente_Usuario",foreignKey: "id_usuario"});
	
	app.route("/cliente")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
			Cliente.findAll({
				include: [{all: true}]})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res, next) => {
			
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
			delete req.body.id;
			next();
		})
		.get((req,res)=>{
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

		})
	app.route("/cliente/:id")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
		.get((req, res) => {
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
		})
		.put((req, res) => {
			Cliente.findOne({where: req.params,
			include: [{model: Usuario, as: "Usuarios"}]})
			.then(clientes=> {
				console.log(req.params);
				Usuario.update({
					nome: req.body.nome,
					telefone: req.body.telefone,
					cpf: req.body.cpf,
					situacao: req.body.situacao
				}, {where: {id: clientes.Usuarios.id}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
			})
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