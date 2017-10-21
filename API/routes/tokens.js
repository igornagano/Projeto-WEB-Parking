var jwt = require("jwt-simple");

module.exports = app => {
	const cfg = app.API.libs.config;
	const Usuario = app.db.models.Usuario;

	app.post("/token", (req, res) => {
		if(req.body.email && req.body.senha){
			const email = req.body.email;
			const senha = req.body.senha;

			Usuario.findOne({where: {email: email}})
			.then(usuario => {
				if (usuario.isPassword(usuario.senha, senha)) {
					const payload = {id: usuario.id};
					res.json({
						token: jwt.encode(payload, cfg.jwtSecret)
					});
				} else{
					res.sendStatus(401);
				}
			})
			.catch(error => res.sendStatus(401));
		} else{
			res.sendStatus(401);
		}
	});
};