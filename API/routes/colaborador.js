module.exports = app => {
	const Colaborador = app.db.models.Colaborador;
	const Empresa = app.db.models.Empresa;
	const Usuario = app.db.models.Usuario;
	
	 Usuario.hasOne(Colaborador, {as: "Colaboradores",through: "Colaborador_Usuario", foreignKey: "id_usuario"});
	 Colaborador.belongsTo(Usuario, { as:"Usuarios",through: "Colaborador_Usuario",foreignKey: "id_usuario"});
	
	Colaborador.belongsTo(Empresa, { as: "Empresas", through: "Colaborador_Empresa", foreignKey: "id_empresa"});
	//Empresa.hasMany(Colaborador, {as: "Colaboradores", through: "Colaborador_Empresa", foreignKey: "id_empresa"});
	
	app.route("/colaborador")
		.all((req,res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/colaborador/", (req, res) => {
			Colaborador.findAll({
			include: [{all: true}]
				})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});
	app.post("/colaborador/", (req, res) => {
				Usuario.create({
					email: req.body.email,
					nome: req.body.nome,
					senha: req.body.senha,
					cpf: req.body.cpf,
					telefone: req.body.telefone
				})
				.then(colaborador => {
							return colaborador.createColaboradores({
								"id_empresa": req.body.id_empresa
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
	app.route("/colaborador/usuario/:email")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/colaborador/usuario/:email", (req, res) => {
			Usuario.findOne({where: req.params,
				include: [{model: Colaborador, as: "Colaboradores"}]}
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
		app.route("/colaborador/empresa/:id_empresa")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		})
	app.get("/colaborador/empresa/:id_empresa", (req, res) => {
			Colaborador.findAll({where: req.params,
				include: [{model: Usuario, as: "Usuario"},{model: Empresa, as: "Empresa"}]}
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
	app.route("/colaborador/:id_colaborador")
		.all((req, res, next) => {
			delete req.body.id;
			next();
		});
	app.get("/colaborador/:id_colaborador", (req, res) => {
			Colaborador.findOne({where: req.params,
			include: [{model: Usuario, as: "Usuarios"},{model: Empresa, as: "Empresas"}]})
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
	app.put("/colaborador/:id_colaborador", (req, res) => {

			Colaborador.update(req.body, {where: req.params,
			include: [{model: Usuario, as: "Usuarios"}]})
			.then(colaborador=> {
				console.log(req.params);
				Usuario.update({
					nome: req.body.nome,
					telefone: req.body.telefone,
					cpf: req.body.cpf,
					situacao: req.body.situacao
				}, {where: {id: colaborador.Usuarios.id_usuario}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
			
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		});


	app.delete("/colaborador/:id_colaborador", (req, res) => {
			Colaborador.update(req.body, {where: req.params,
			include: [{model: Usuario, as: "Usuarios"}]})
			.then(colaborador=> {
					console.log(req.params);
					Usuario.update({
						situacao: "I"
					}, {where: {id: colaborador.Usuarios.id_usuario}})
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